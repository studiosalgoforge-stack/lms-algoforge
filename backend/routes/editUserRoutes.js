import express from "express";
import EditUser from "../models/EditUser.js";

const router = express.Router();

// CREATE or UPDATE edited profile
router.put("/", async (req, res) => {
  const { userId, firstName, lastName, email, phone, address, state, zip, country, language, avatar } = req.body;

  try {
    let editUser = await EditUser.findOne({ userId });

    if (editUser) {
      // Update existing record
      editUser.firstName = firstName;
      editUser.lastName = lastName;
      editUser.email = email;
      editUser.phone = phone;
      editUser.address = address;
      editUser.state = state;
      editUser.zip = zip;
      editUser.country = country;
      editUser.language = language;
      editUser.avatar = avatar || editUser.avatar;
      editUser.updatedAt = Date.now();
      await editUser.save();
    } else {
      // Create new record
      editUser = new EditUser({ userId, firstName, lastName, email, phone, address, state, zip, country, language, avatar });
      await editUser.save();
    }

    res.json({ success: true, editUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET edited profile
router.get("/:userId", async (req, res) => {
  try {
    const editUser = await EditUser.findOne({ userId: req.params.userId });
    if (!editUser) return res.status(404).json({ message: "Edited profile not found" });
    res.json(editUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
