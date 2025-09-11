import mongoose from "mongoose";

const supportQuerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    query: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.model("SupportQuery", supportQuerySchema);
