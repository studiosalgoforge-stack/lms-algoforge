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

// ---------------- BACKUP PPTS ----------------
const backupPPTs = {
  "Data-Science": [
     { name: "Advanced Regression for Count Data", link:"https://docs.google.com/presentation/d/1kAban4f0Uuqk_mKTjLmBOW4dOEfmvKt3/preview" ,
       assignments : "https://drive.google.com/uc?export=download&id=17rcLQ2roOeywbXdIyPDLLoMiqvuftR9L"},
     { name: "Association Rule - 1",link:"https://docs.google.com/presentation/d/1CIUkcmkhtQQgRJYw76S6DRWdZv-GT-Fl/preview" , assignments:"https://drive.google.com/uc?export=download&id=1ZvNH7mt8mnUxIib_zllXsMuGkEvgnDwb"},
      { name: "Association Rule - 2 and Recommendation Engine - 1",link:"https://docs.google.com/presentation/d/1Hg4JYyl_CGBIZqtygFupfF2vdnG4-3BU/preview" , assignments:"https://drive.google.com/uc?export=download&id=1PwgVBkdnkQsPTFACPC7t0vargZGjwk8f"},
    { name: "Business moment", link:"https://docs.google.com/presentation/d/1hElVRlRnPcVWxaPT5QUE2O5DxwDUQJfT/preview"},
    { name: "Confidence Interval - 1", link: "https://docs.google.com/presentation/d/1C7iZmnKe7cAv5snL3DD3PvdO_N7Yk81p/preview" , assignments:"https://drive.google.com/uc?export=download&id=d/1vy7zWo5p8oSTZCkDJu-VPZR8b1PQ2bBg"},
     { name: "Confidence Interval - 2", link: "https://docs.google.com/presentation/d/1CzEGVMPuW_ibgj2ZTl_mvzvz_WxfNht4/preview" , assignments:"https://drive.google.com/uc?export=download&id=1pRE6fEm4qYeuX3d97TevD7Sy1y434rwQ" },
    { name: "Convolutional Neural Network (CNN)", link: "https://docs.google.com/presentation/d/1OqBeOyykd04391nSCoTWRzuDZgjIqkbB/preview" , assignments:"https://drive.google.com/uc?export=download&id=1sTkp1kpeiAZ3KL-TvzHZtMisYnjWqAn9" },
    {name: "Copy of Recommendation Engine -2" , link:"https://docs.google.com/presentation/d/1rP6_yug2UxvWdszl9-vNQlnI4dl8Iy9C/preview"}
  ],
  SQL: [
    {name: "1 SQL Introduction", link:"https://docs.google.com/presentation/d/1BECUfhOhXTDWfNPJZDxw4gA1giWYwK1E/preview"},
    {name: "2 Introduction to DBMS and RDBMS", link: "https://docs.google.com/presentation/d/1kRJxhgK8ShxRfFRWKMElktz52u1qgWXo/preview"},
   {name: "3 Installation Steps for MySQL for windows", link: "https://docs.google.com/presentation/d/1AbhTDz1cjwZxkhJRdZNnPIar1RIRdlnL/preview"},
   {name: "4 SQL Operators", link: "https://docs.google.com/presentation/d/1gjEb5G9LFgT0fZ8XPBqh1lWvtUIO2VP3/preview"},
   {name: "5 SQL Constraints", link: "https://docs.google.com/presentation/d/192soPE6O_xZ1z5QyIcBgcJ-f1NbmKvjR/preview"},
  ],
  "Power-BI": [
     {name: "1 Course Outline", link: "https://docs.google.com/presentation/d/1Y6i26XAA8OTZFrUSKQugal_zJUHPF3iu/preview"},
    {name: "2 Installation", link: "https://docs.google.com/presentation/d/19FoSK-2SB7Lf7ZF8zkXyMmyhiV5GWIEe/preview"},
   {name: "3 Study Material",link:  "https://docs.google.com/presentation/d/1e6XjemjvS-gqSl6OPqv1WW96dqpGoPCa/preview"},
    {name: "4 Power BI Desktop", link:"https://docs.google.com/presentation/d/1cka_VZaaO4bvj7P8t4kv2-0pkkM6c4PD/preview"},
    {name: "5 Data Visualization", link:"https://docs.google.com/presentation/d/1MJ3TsDgAN31f-UviHIYJZN-52GL8e_Hh/preview"},
  ],
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
