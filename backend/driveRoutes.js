import express from "express";
import { listFiles } from "./driveManager.js";
import { getCache, setCache } from "./cache.js";
import { backupPPTs } from "./backupPPTs.js";


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
  let files=[];
    try{
    files = await listFiles(folderId);
console.log(`📂 Files in ${course}/${category}:`, files);
 } catch (err) {
      console.error(`❌ Error fetching Drive files for ${course}/${category}:`, err.message);
    }
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
    "application/vnd.ms-powerpoint", // add if some are PPT
    "application/vnd.google-apps.document", // Google Docs
  ];
} else if (category === "assignments") {
  allowedTypes = [
    "application/zip",
    "application/x-zip-compressed",
    "application/pdf",
    "application/vnd.google-apps.folder", // nested folders
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
}


    const formatted = formatFiles(files, allowedTypes);

    // Merge backup PPTs only for ppts
    if (category === "ppts") {
      const backupFormatted = (backupPPTs[course] || []).map((item, index) => ({
        id: `backup-${index + 1}`,
        name: item.name,
        previewUrl: item.link,
        webViewLink: item.link.replace("/preview", "/view"),
        isShortcut: false,
      }));

      formatted.push(...backupFormatted);
    }

    if (category === "assignments" && backupPPTs[course]) {
  const backupAssignments = backupPPTs[course]
    .filter(item => item.assignments)
    .map((item, idx) => ({
      id: `backup-assignment-${idx}`,
      name: `${item.name} Assignment`,
      webViewLink: item.assignments,
      previewUrl: item.assignments,
    }));
  formatted.push(...backupAssignments);
}

    setCache(cacheKey, formatted);

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching files:", err.message);
    res.status(500).json({ error: "Error fetching files", details: err.message });
  }
});

export default router;
