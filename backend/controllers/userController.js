import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";  




// REGISTER / SIGNUP
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, role } = req.body;

    // check required fields
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email/username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Username already exists" });
    }

    // create new user
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      role: role || "student",
      avatar: null,
      isActive: true,
      emailVerified: false, // set false if you want email verification
      lastLogin: null,
    });

    // issue JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// LOGIN
// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    console.log("Login attempt:", { identifier, password });

    // 1. Find user
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      console.log("❌ User not found for identifier:", identifier);
      return res.status(400).json({ message: "User not found" });
    }

    console.log("✅ User found:", { email: user.email, username: user.username });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Invalid password. Entered:", password, "Stored hash:", user.password);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
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


// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // don't send password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//edit-profile

export const editUserProfile = async (req, res) => {
  try {
    // The protect middleware should attach the user ID to the request object
    const userId = req.user._id; 
    
    const { firstName, lastName, phone, address, state, zip, country, language } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        address,
        state,
        zip,
        country,
        language,
      
      },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Profile updated successfully!",
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
         phone:updatedUser.phone,
        address: updatedUser.address,
        state: updatedUser.state,
        zip: updatedUser.zip,
        country: updatedUser.country,
        language: updatedUser.language,
      
      },
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error. Failed to update profile." });
  }
};

