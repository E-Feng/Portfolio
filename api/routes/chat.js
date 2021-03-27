const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');

router.route('/').put(chatController.addChat);

module.exports = router;