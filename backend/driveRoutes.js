import express from "express";
import { listFiles } from "./driveManager.js";
import { getCache, setCache } from "./cache.js";

const router = express.Router();

export const courseFolders = {
  "Data-Science": {
    ppts: "1Z4VqDF8lKgdI3Fv4PwR2HECJ-Bzra69v",
    interview: "12CLV0C_9JX4PWq3W_GrpbfA5iQO6WkQ0",
    assignments: "1CX17BfjZ2EWUuDjUWAZdXV-skceJJJbi",
  },
  "SQL": {
    ppts: "1pISXqOOYHzIQa5EEME6Ao5skwF8w8SZ6",
    interview: "6F7G8H9I0J1K2L3M4N5O",
    assignments: "5E6F7G8H9I0J1K2L3M4N",
  },
  "Power-BI": {
    ppts: "1yCLZcXZr5SYMYgjaMSn5EtwMdPk2HuEQ",
    interview: "9I0J1K2L3M4N5O6P7Q8R",
    assignments: "8H9I0J1K2L3M4N5O6P7Q",
  },
};

function formatFiles(files, allowedTypes = []) {
  return files
    .filter(
      (f) => allowedTypes.length === 0 || allowedTypes.includes(f.mimeType)
    )
    .map((file) => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      webViewLink: file.webViewLink,
      previewUrl: `https://drive.google.com/file/d/${file.id}/preview`,
      isShortcut: file.isShortcut || false,
    }));
}

// Generic route: /api/drive/:course/:category
router.get("/:course/:category", async (req, res) => {
  try {
    const { course, category } = req.params;

    if (!courseFolders[course] || !courseFolders[course][category]) {
      return res.status(404).json({ error: "Invalid course or category" });
    }

    const cacheKey = `${course}-${category}`;
    let cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    const folderId = courseFolders[course][category];
    const files = await listFiles(folderId);

    let allowedTypes = [];
    if (category === "ppts") {
      allowedTypes = [
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.ms-powerpoint",
        "application/vnd.google-apps.presentation",
      ];
    } else if (category === "interview") {
      allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
    } else if (category === "assignments") {
      allowedTypes = [
        "application/zip",
        "application/x-zip-compressed",
        "application/pdf",
      ];
    }

    const formatted = formatFiles(files, allowedTypes);
    setCache(cacheKey, formatted);

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching files:", err.message);
    res
      .status(500)
      .json({ error: "Error fetching files", details: err.message });
  }
});

export default router;
