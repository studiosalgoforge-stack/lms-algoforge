import express from "express";
import { loginUser , changePassword , registerUser , getUserProfile , editUserProfile } from "../controllers/userController.js";
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

//Add the new route for editing the profile
router.put("/edituser", protect, editUserProfile);

export default router;
