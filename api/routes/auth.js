const express = require('express');
const router = express.Router();
const steamAuth = require('../controllers/steamAuth');
const patreonAuth = require('../controllers/patreonAuth');
const firebaseAuth = require('../controllers/firebaseAuth');

// Steam Auth routes
router.get('/steam/', steamAuth.authUser, steamAuth.postAuth);
router.get('/steam/account', steamAuth.getUser);

// Patreon Auth routes
router.get('/patreon/', patreonAuth.authUser);
router.get('/patreon/account', patreonAuth.getUser);

// Post Auth database routes
router.get('/firebase/', firebaseAuth.addUser);

module.exports = router;