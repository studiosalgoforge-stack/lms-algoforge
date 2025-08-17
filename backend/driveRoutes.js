import express from "express";
import { listFiles } from "./driveManager.js";
import { getCache, setCache } from "./cache.js";
const router = express.Router();


function formatFiles(files, allowedTypes = []) {
  return files
    .filter(f => allowedTypes.length === 0 || allowedTypes.includes(f.mimeType))
    .map(file => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      webViewLink: file.webViewLink,
      previewUrl: `https://drive.google.com/file/d/${file.id}/preview`,
      isShortcut: file.isShortcut || false,
    }));
}
// PPTs
router.get("/ppt", async (req, res) => {
  try {
     let cached = getCache("ppt");
    if (cached) return res.json(cached);
    const files = await listFiles("1Z4VqDF8lKgdI3Fv4PwR2HECJ-Bzra69v");
    const ppts = formatFiles(files, [
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
      "application/vnd.ms-powerpoint",                                            // Old PPT
      "application/vnd.google-apps.presentation",                                 // Google Slides
    ]);
      setCache("ppt", ppts);
    res.json(ppts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching PPT files");
  }
});

//  Interview Questions
router.get("/interview", async (req, res) => {
  try {
    const files = await listFiles("12CLV0C_9JX4PWq3W_GrpbfA5iQO6WkQ0");
     const docs = formatFiles(files, [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching Interview files");
  }
});

//  Study Materials
router.get("/study", async (req, res) => {
  try {
    const files = await listFiles("1CX17BfjZ2EWUuDjUWAZdXV-skceJJJbi");
      const zips = formatFiles(files, [
      "application/zip",
      "application/x-zip-compressed",
    ]);
    res.json(zips);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching Study files");
  }
});

export default router;
