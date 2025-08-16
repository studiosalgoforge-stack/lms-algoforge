const express = require('express');
const router = express.Router();
const { googleOAuth, googleCallback } = require('../controllers/authController');

// Start Google OAuth
router.get('/google', googleOAuth);

// Callback route (must match REDIRECT_URI in .env)
router.get('/lms/oauth2callback', googleCallback);

module.exports = router;
