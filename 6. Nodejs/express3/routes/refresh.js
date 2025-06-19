const express = require('express');
const refreshTokenRouter = express.Router();
const path = require('path')
const refreshTokenController = require(path.join(__dirname, '..', 'controllers', 'refreshTokenController.js'));

refreshTokenRouter.get('^/$', refreshTokenController.handleRefreshToken );

module.exports = refreshTokenRouter 