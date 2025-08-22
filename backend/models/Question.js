import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
   authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    authorName: { type: String, default: "Admin" },
    authorRole: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, default: "General Question" },
    tags: [String],
    views: { type: Number, default: 0 },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who asked
    authorName: { type: String },
    authorRole: { type: String, default: "user" },
    image: { type: String },
    answers: [answerSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
