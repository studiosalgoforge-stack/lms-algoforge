import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";  // adjust path if needed

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ 
       $or: [{ email: identifier }, { username: identifier }],
     });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email , username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
