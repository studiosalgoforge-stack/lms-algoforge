import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
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
    answers: [answerSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
