const path  = require('path');
const { logEvents } = require(path.join(__dirname, 'logEvents' ));

const errorHandler =  (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
    logEvents(`${req.headers.origin}\t${req.url}\t${err.message}`, 'errLog.txt');
}

module.exports = errorHandler;

