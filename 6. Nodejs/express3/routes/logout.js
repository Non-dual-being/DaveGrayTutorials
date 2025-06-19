const express = require('express');
const logOutRouter = express.Router();
const path = require('path')
const LogOutController = require(path.join(__dirname, '..', 'controllers', 'logoutController.js'));

logOutRouter.get('^/$', LogOutController.handleLogout );

module.exports = logOutRouter