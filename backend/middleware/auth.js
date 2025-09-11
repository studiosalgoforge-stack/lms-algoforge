import jwt from "jsonwebtoken";
import User from "../models/User.js"; // adjust path if needed
import express from "express";
import bcrypt from "bcrypt";
<<<<<<< HEAD
// import nodemailer from "nodemailer";

// const router = express.Router();

// // ✅ Request Reset Link
// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Generate reset token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "15m",
//     });

//     // Decide frontend URL dynamically
//     const FRONTEND_URL =
//       process.env.NODE_ENV === "development"
//         ? process.env.FRONTEND_URL_LOCAL
//         : process.env.FRONTEND_URL_PROD;

//     const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;

//     // Setup Nodemailer
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // or smtp
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"LMS Support" <${process.env.EMAIL_USER}>`,
//       to: user.email,
//       subject: "Password Reset Request",
//       html: `<p>Click the link below to reset your password:</p>
//              <a href="${resetLink}">${resetLink}</a>`,
//     });

//     res.json({ message: "Reset link sent successfully" });
//   } catch (err) {
//     console.error("Forgot password error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Reset Password
// router.post("/reset-password", async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(400).json({ message: "Invalid token" });

//     // Hash new password
//     const hashed = await bcrypt.hash(newPassword, 10);
//     user.password = hashed;
//     await user.save();

//     res.json({ message: "Password reset successful" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     res.status(400).json({ message: "Invalid or expired token" });
//   }
// });

// export default router;

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware: check if user is authenticated

=======
import nodemailer from "nodemailer";

const router = express.Router();



// ✅ Request Reset Link
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Decide frontend URL dynamically
    const FRONTEND_URL =
      process.env.NODE_ENV === "development"
        ? process.env.FRONTEND_URL_LOCAL
        : process.env.FRONTEND_URL_PROD;

    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // or smtp
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"LMS Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ message: "Reset link sent successfully" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Reset Password
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token" });

    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

export default router;

// Middleware: check if user is authenticated
>>>>>>> 554c5343c23f350e1a8699831b9f7e0b95b864ba
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user info to request
    req.user = {
      id: user._id,
      username: user.name || user.username,
      role: user.role || "user",
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Admin-only (keep this too if you still need it somewhere else)
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

