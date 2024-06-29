const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chat.controller');

router.get('/listChat', ChatController.listChat);

module.exports = router;