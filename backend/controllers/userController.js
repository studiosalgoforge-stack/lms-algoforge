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


// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const userId = req.user._id; // comes from protect middleware
    const { current, newPass } = req.body;

    if (!current || !newPass) {
      return res.status(400).json({ message: "Please provide current and new password" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // check current password
    const isMatch = await bcrypt.compare(current, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // update new password
    user.password = newPass; // schema pre("save") will hash automatically
    await user.save();

       res.status(200).json({
      message: "Password updated successfully. Please log in again.",
  } );
}catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

