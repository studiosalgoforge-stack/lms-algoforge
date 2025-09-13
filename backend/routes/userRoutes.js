import express from "express";
import { loginUser , changePassword , registerUser , getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();


//POST /api/users/register
router.post("/signup" , registerUser);

// POST /api/users/login
router.post("/login", loginUser);

// GET PROFILE (needs token)
router.get("/profile", protect, getUserProfile);

// PUT /api/users/change-password
router.put("/change-password", protect, changePassword);

export default router;
