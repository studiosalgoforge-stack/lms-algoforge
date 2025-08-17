import express from "express";
import { googleOAuth, googleCallback } from "../controllers/authController.js"; // 👈 note the .js extension

const router = express.Router();

// Start Google OAuth
router.get("/google", googleOAuth);

// Callback route (matches REDIRECT_URI)
router.get("/lms/oauth2callback", googleCallback);

export default router;
