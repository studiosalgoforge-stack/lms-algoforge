import mongoose from "mongoose";

const editUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
  language: { type: String },
  avatar: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("EditUser", editUserSchema);
