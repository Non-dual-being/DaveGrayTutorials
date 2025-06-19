const express = require('express');
const authRouter = express.Router();
const path = require('path')
const authController = require(path.join(__dirname, '..', 'controllers', 'authController'));

authRouter.post('^/$', authController.handleLogin);

module.exports = authRouter 