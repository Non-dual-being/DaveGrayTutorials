const express = require('express');
const registerRouter = express.Router();
const path = require('path')
const registerController = require(path.join(__dirname, '..', 'controllers', 'registerController'));

registerRouter.post('^/$', registerController.handleNewUser);

module.exports = registerRouter;
