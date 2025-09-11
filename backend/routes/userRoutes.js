import express from "express";
import { loginUser , changePassword , registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();


//POST /api/users/register
router.post("/signup" , registerUser);

// POST /api/users/login
router.post("/login", loginUser);

// PUT /api/users/change-password
router.put("/change-password", protect, changePassword);

export default router;
