const path = require('path');
const allowedOrigins = require(path.join(__dirname, '..', 'config', 'allowedOrigins.js'));

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();

    //de acces allowed is nodig voor de cookie http only te verzenden en te ontvangen via patch en is odnerdel van include in de fetcth front end
    //is nodig voor cors

}

module.exports = credentials