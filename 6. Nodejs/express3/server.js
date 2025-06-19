
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { logger }= require('./middleware/logEvents');
const  errorHandler = require('./middleware/errorHandler');
const verifyJWT = require(path.join(__dirname, 'middleware', 'verifyJWT'));
const cookieParser = require('cookie-parser');
const cors = require('cors');
const credentials = require(path.join(__dirname, 'middleware', 'credentials'))
const corsOptions = require(path.join(__dirname, 'config', 'corsOptions' ));
const mongoose = require('mongoose');
const connectDB = require(path.join(__dirname, 'config', 'dbConn'));
const PORT = process.env.PORT || 3500;


//Connect to MongoDB

connectDB();

//routers
const mainrouter = require(path.join(__dirname, 'routes', 'root'));
const emprouter = require(path.join(__dirname, 'routes', 'api', 'employees'));
const registerRouter = require(path.join(__dirname, 'routes', 'register'));
const authRouter = require(path.join(__dirname, 'routes', 'auth'));
const refreshRouter = require(path.join(__dirname, 'routes', 'refresh'));
const logoutRouter = require(path.join(__dirname, 'routes', 'logout'));


//custom loger
app.use(logger);
//cross Origin Resource Sharing

//de credentials voor de cors om foutmelding te voorkomen met het verzenden van de htpp only cookies
app.use(credentials);

app.use(cors(corsOptions));

//formdata, content-type: application/x-www.form-urlencoded
app.use(express.urlencoded({ extended: false}));

//enable json
app.use(express.json());

//cookies
app.use(cookieParser());

//serve static content as css and img
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('^/$', mainrouter )
app.use('^/register', registerRouter);
app.use('^/auth', authRouter);
app.use('^/refresh', refreshRouter);
app.use('^/logout', logoutRouter);


//waterfall, everything below the use of verifyJWT wil be verifed with the token
app.use(verifyJWT);
app.use('^/employees', emprouter);


//app.all can handle al sort of requests and regex is allowed
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')){
        res. sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({error : '404 not found'})
    } else {
        res.type('txt').send("404 not found")
    }
})
    
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
