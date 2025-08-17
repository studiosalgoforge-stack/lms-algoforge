import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";


import driveRoutes from "./driveRoutes.js";
import { listFiles } from "./driveManager.js"; // 👈 ESM import
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; 
import editUserRoutes from "./routes/editUserRoutes.js";

dotenv.config();
const app = express();
const PORT = 5000;

//  middleware first
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
//routes
app.use('/auth', authRoutes);
app.use("/api/drive", driveRoutes);
app.use('/api/users' , userRoutes);
app.use("/api/edituser", editUserRoutes);
// example health check
app.get("/", (req, res) => res.send("API running"));

//  Route to list Drive files
app.get('/files', async (req, res) => {
  try {
    const folderId = '1laOuhf6H5gx0Lf_iZWfNeei1x9jMzRO7'; // your folder ID
    const files = await listFiles(folderId);
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching files');
  }
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Error:", err));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
