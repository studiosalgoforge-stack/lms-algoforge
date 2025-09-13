import express from "express";
import { getUserProgress, addCourseProgress, migrateProgress , updateQuizProgress , updateVideoProgress ,updateStudyTime  , getProgress , getQuizProgress , getVideoProgress} from "../controllers/progressController.js";
import { protect } from "../middleware/auth.js";


const router = express.Router();

// GET all or course-specific progress
router.get("/", protect, getUserProgress);

// Keep POST routes as-is
router.post("/", protect, addCourseProgress);
router.post("/migrate", protect, migrateProgress);

// Quiz
router.put("/quiz/:quizId", protect, updateQuizProgress);

// Video
router.put("/video/:videoId", protect, updateVideoProgress);

// Study Time
router.put("/studytime/:courseKey", protect, updateStudyTime);

// Unified progress + profile info
router.get("/dashboard", protect, getProgress);

router.get("/quiz", protect, getQuizProgress);

// Add GET for videos
router.get("/videos", protect, getVideoProgress);


export default router;
