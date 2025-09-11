import express from "express";
import { getUserProgress, addCourseProgress, migrateProgress } from "../controllers/progressController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET all or course-specific progress
router.get("/", protect, getUserProgress);

// Keep POST routes as-is
router.post("/", protect, addCourseProgress);
router.post("/migrate", protect, migrateProgress);

export default router;
