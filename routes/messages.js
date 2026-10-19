const express = require('express')
const messageRouter = express.Router();
const {middleWareFn} = require('../middleware/auth')
const {getMessages} = require('../controllers/messages')
messageRouter.get("/", middleWareFn, getMessages);
module.exports = { messageRouter }