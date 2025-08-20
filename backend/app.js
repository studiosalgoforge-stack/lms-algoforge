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
dotenv.config();
const app = express();
const PORT = 5000;

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: ["https://dev-lms-prototype.vercel.app/", "http://localhost:5000"],
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
// example health check
app.get("/", (req, res) => res.send("API running"));
app.get('/api/health', (_, res) => res.json({ ok: true }));

const csvFilePath = "./support_queries.csv";

// POST endpoint to save form data
app.post("/api/support", (req, res) => {
  const { name, email, phone, query } = req.body;

  if (!name || !email || !phone || !query) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newEntry = { name, email, phone, query, date: new Date().toISOString() };

  let csv;
  if (fs.existsSync(csvFilePath)) {
    const existingData = fs.readFileSync(csvFilePath, "utf8");
    csv = existingData + "\n" + new Parser({ header: false }).parse([newEntry]);
  } else {
    csv = new Parser().parse([newEntry]);
  }

  fs.writeFileSync(csvFilePath, csv, "utf8");

  res.json({ success: true });
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
  console.log(`Server running on http://localhost:${PORT}`)
);
