// routes/notificationRoutes.js
import express from "express";
import { createNotification, getNotifications } from "../controllers/notificationController.js";
import { protect } from "../middleware/auth.js"; // Assume you have a protect middleware

const router = express.Router();
router.post("/send", protect, createNotification); // Admin-only route
router.get("/", protect, getNotifications);
export default router;