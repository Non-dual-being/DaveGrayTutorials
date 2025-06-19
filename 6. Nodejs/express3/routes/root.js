const express = require('express');
const mainrouter = express.Router();
const path = require('path');

mainrouter.get('^/$|/index(.html)?', (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = mainrouter;