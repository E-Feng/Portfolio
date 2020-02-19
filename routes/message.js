const express = require('express');
const router = express.Router();
const contact = require('../controllers/message');

router.route('/').post(contact.addMessage);

module.exports = router;