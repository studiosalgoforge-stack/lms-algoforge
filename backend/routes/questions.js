import { Router } from "express";
import Question from "../models/Question.js";
import { adminOnly } from "../middleware/auth.js";

const router = Router();

// List questions with pagination + category
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


// Post answer (any user)
router.post("/:id/answers", authMiddleware, async (req, res) => {
  const { body } = req.body;
  if (!body?.trim())
    return res.status(400).json({ error: "Answer body required" });

  const q = await Question.findById(req.params.id);
  if (!q) return res.status(404).json({ error: "Not found" });

  q.answers.push({
    body: body.trim(),
    authorName: req.user.username, // Get username from authenticated user
    authorRole: req.user.role,
  });
  await q.save();

  res.status(201).json(q);
});


// Get single question + increment views
router.get("/:id", async (req, res) => {
  const q = await Question.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!q) return res.status(404).json({ error: "Not found" });
  res.json(q);
});

// Post answer (any user)
router.post("/:id/answers", async (req, res) => {
  const { body, authorName, authorRole } = req.body;
  if (!body?.trim())
    return res.status(400).json({ error: "Answer body required" });

  const q = await Question.findById(req.params.id);
  if (!q) return res.status(404).json({ error: "Not found" });

  q.answers.push({
    body: body.trim(),
    authorName: authorName || "Anonymous",
    authorRole: authorRole || "user",
  });
  await q.save();

  res.status(201).json(q);
});


export default router;
