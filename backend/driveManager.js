// driveManager.js
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN_PATH = path.join(__dirname, "tokens.json");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Load tokens if available
let tokens = null;
if (fs.existsSync(TOKEN_PATH)) {
  tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
  oauth2Client.setCredentials(tokens);
  console.log("✅ Tokens loaded into oauth2Client");
} else {
  console.log("⚠️ No tokens.json found. Please authenticate via /api/auth/google first.");
}

// Auto-refresh tokens & save if refresh_token exists
oauth2Client.on("tokens", (newTokens) => {
  if (newTokens.refresh_token) tokens.refresh_token = newTokens.refresh_token;
  if (newTokens.access_token) tokens.access_token = newTokens.access_token;
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log("🔄 Tokens refreshed and saved.");
});

const drive = google.drive({ version: "v3", auth: oauth2Client });

export async function listFiles(folderId) {
  try {
    if (!tokens) {
      throw new Error("No tokens loaded. Authenticate first via /api/auth/google");
    }

    // Refresh access token if refresh_token exists
    if (tokens.refresh_token && oauth2Client.credentials.expiry_date < Date.now()) {
      console.log("⏳ Refreshing access token...");
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);
      tokens = credentials;
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
      console.log("🔄 Access token refreshed.");
    } else if (!tokens.refresh_token && oauth2Client.credentials.expiry_date < Date.now()) {
      console.warn("⚠️ No refresh token available. Data may expire soon.");
    }

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
    throw err;
  }
}
