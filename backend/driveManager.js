// driveManager.js
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const TOKEN_PATH = path.join(__dirname, "tokens.json");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

if (fs.existsSync(TOKEN_PATH)) {
  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
  oauth2Client.setCredentials(tokens);
  console.log("✅ Tokens loaded into oauth2Client");
} else {
  console.log("⚠️ No tokens.json found. Please authenticate first.");
}

const drive = google.drive({ version: "v3", auth: oauth2Client });

/**
 * Recursively lists files inside a folder (resolves shortcuts + nested folders)
 */
export async function listFiles(folderId) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: "files(id, name, mimeType, webViewLink, shortcutDetails)",
  });

  const allFiles = [];

  for (const file of res.data.files) {
    // Handle shortcuts
    if (file.mimeType === "application/vnd.google-apps.shortcut") {
      const targetId = file.shortcutDetails?.targetId;
      const targetMimeType = file.shortcutDetails?.targetMimeType;

      if (targetMimeType === "application/vnd.google-apps.folder") {
        // 👇 if shortcut points to a folder, fetch inside it
        const nested = await listFiles(targetId);
        allFiles.push(...nested);
      } else {
        // Shortcut to a single file
        allFiles.push({
          id: targetId,
          name: file.name,
          mimeType: targetMimeType,
          webViewLink: `https://drive.google.com/file/d/${targetId}/view`,
          isShortcut: true,
        });
      }
    } else if (file.mimeType === "application/vnd.google-apps.folder") {
      // 👇 expand actual folders too (if you want recursive)
      const nested = await listFiles(file.id);
      allFiles.push(...nested);
    } else {
      // Normal file
      allFiles.push({
        ...file,
        isShortcut: false,
      });
    }
  }

  return allFiles;
}
