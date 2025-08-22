import { Router } from "express";
import Question from "../models/Question.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = Router();

// configure multer for image uploads (stores in /uploads folder with proper extension)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // unique filename
  },
});
const upload = multer({ storage });

/**
 * Create a new question (logged-in user only)
 */
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, body, category } = req.body;

    if (!title?.trim() || !body?.trim()) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    const question = new Question({
      title: title.trim(),
      body: body.trim(),
      category: category || "General Question",
      authorId: req.user.id,
      authorName: req.user.username,
      authorRole: req.user.role || "user",
      image: req.file ? `/uploads/${req.file.filename}` : null, // save image path
      createdAt: new Date(),
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ error: "Failed to create question" });
  }
});

/**
 * Get questions by category (filtering)
 * ⚠️ must be before "/:id" or else "category" will be treated as an id
 */
router.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const questions = await Question.find({ category: categoryName }).sort({
      createdAt: -1,
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category questions" });
  }
});

/**
 * Get all questions with pagination and category filter
 */
router.get("/", async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const pageSize = Math.min(24, parseInt(req.query.pageSize || "6", 10));
  const category =
    req.query.category && req.query.category !== "All"
      ? req.query.category
      : undefined;

  const query = category ? { category } : {};
  const [items, total] = await Promise.all([
    Question.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize),
    Question.countDocuments(query),
  ]);

  res.json({
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
});

/**
 * Get a single question and increment views
 */
router.get("/:id", async (req, res) => {
  const q = await Question.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!q) return res.status(404).json({ error: "Not found" });
  res.json(q);
});

/**
 * Post an answer (logged-in user only)
 */
router.post("/:id/answers", protect, async (req, res) => {
  const { body } = req.body;
  if (!body?.trim()) {
    return res.status(400).json({ error: "Answer body required" });
  }

  const q = await Question.findById(req.params.id);
  if (!q) return res.status(404).json({ error: "Not found" });

  q.answers.push({
    body: body.trim(),
    authorId: req.user.id,
    authorName: req.user.username,
    authorRole: req.user.role || "user",
    createdAt: new Date(),
  });

  await q.save();
  res.status(201).json(q);
});

/**
 * Edit an answer (only by author)
 */
router.put("/:id/answers/:answerId", protect, async (req, res) => {
  const { body } = req.body;
  if (!body?.trim()) {
    return res.status(400).json({ error: "Answer body required" });
  }

  const q = await Question.findById(req.params.id);
  if (!q) return res.status(404).json({ error: "Question not found" });

  const answer = q.answers.id(req.params.answerId);
  if (!answer) return res.status(404).json({ error: "Answer not found" });

  if (answer.authorId.toString() !== req.user.id) {
    return res.status(403).json({ error: "Not authorized" });
  }

  answer.body = body.trim();
  await q.save();
  res.json(answer);
});

/**
 * Delete an answer (only by author)
 */
router.delete("/:id/answers/:answerId", protect, async (req, res) => {
  const q = await Question.findById(req.params.id);
  if (!q) return res.status(404).json({ error: "Question not found" });

  const answer = q.answers.id(req.params.answerId);
  if (!answer) return res.status(404).json({ error: "Answer not found" });

  if (answer.authorId.toString() !== req.user.id) {
    return res.status(403).json({ error: "Not authorized" });
  }

  answer.deleteOne();
  await q.save();
  res.json({ success: true });
});

export default router;
