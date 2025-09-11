import express from "express";
import cors from "cors";
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"; // Import cookie-parser
import fs from "fs";
import { Parser } from "json2csv";
import driveRoutes from "./driveRoutes.js";
import { listFiles } from "./driveManager.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import editUserRoutes from "./routes/editUserRoutes.js";
import questionsRoute from "./routes/questions.js";
import SupportQuery from "./models/SupportQuery.js";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://algoforge-lms-prototype-j5ak.vercel.app/",
       "https://lms-algoforge.onrender.com"
      ],
     methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser

// ... (rest of the file remains the same)

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log("Headers:", res.getHeader("Access-Control-Allow-Origin"));
  });
  next();
});

app.use(morgan('dev'));
app.use(express.json());


//routes
app.use('/auth', authRoutes);
app.use("/api/drive", driveRoutes);
app.use('/api/users' , userRoutes);
app.use("/api/edituser", editUserRoutes);
console.log("➡️ Mounting /api/questions...");
app.use('/api/questions', questionsRoute);

// serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// example health check
app.get("/", (req, res) => res.send("API running"));
app.get('/api/health', (_, res) => res.json({ ok: true }));

const csvFilePath = "./support_queries.csv";


// POST endpoint to save form data in MongoDB
app.post("/api/support", async (req, res) => {
  const { name, email, phone, query } = req.body;

  if (!name || !email || !phone || !query) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newQuery = new SupportQuery({ name, email, phone, query });
    await newQuery.save();

    res.status(201).json({
      success: true,
      message: "Support query saved successfully!",
      data: newQuery,
    });
  } catch (err) {
    console.error("Error saving support query:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});
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

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Error:", err));

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`) // Use a more general message
);
