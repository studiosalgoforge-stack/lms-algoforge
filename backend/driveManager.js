import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Load refresh token from environment
if (!process.env.GOOGLE_REFRESH_TOKEN) {
  throw new Error("Set GOOGLE_REFRESH_TOKEN in your .env");
}

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oauth2Client });

export async function listFiles(folderId) {
  try {
    // This will auto-refresh access token if expired
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: "files(id, name, mimeType, webViewLink, shortcutDetails)",
    });

    const allFiles = [];

    for (const file of res.data.files) {
      if (file.mimeType === "application/vnd.google-apps.shortcut") {
        const targetId = file.shortcutDetails?.targetId;
        const targetMimeType = file.shortcutDetails?.targetMimeType;

        if (targetMimeType === "application/vnd.google-apps.folder") {
          const nested = await listFiles(targetId);
          allFiles.push(...nested);
        } else {
          allFiles.push({
            id: targetId,
            name: file.name,
            mimeType: targetMimeType,
            webViewLink: `https://drive.google.com/file/d/${targetId}/view`,
            isShortcut: true,
          });
        }
      } else if (file.mimeType === "application/vnd.google-apps.folder") {
        const nested = await listFiles(file.id);
        allFiles.push(...nested);
      } else {
        allFiles.push({ ...file, isShortcut: false });
      }
    }

    return allFiles;
  } catch (err) {
    console.error("❌ Error listing Drive files:", err.message);
    throw new Error("Error fetching files: " + err.message);
  }
}
