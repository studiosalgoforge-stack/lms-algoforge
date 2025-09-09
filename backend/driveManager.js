import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Load refresh token from environment
if (!process.env.GOOGLE_REFRESH_TOKEN) {
  throw new Error("Set GOOGLE_REFRESH_TOKEN in your .env");
}

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oauth2Client });


export async function makeFilePublic(fileId) {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",          // only view
        type: "anyone",          // anyone with link
      },
    });

    // Optionally, fetch updated file info
    const file = await drive.files.get({
      fileId,
      fields: "id, name, webViewLink, webContentLink",
    });

    return file.data;
  } catch (err) {
    console.error("❌ Error setting file public:", err.message);
    throw err;
  }
}

// Only ONE definition!
export async function listFiles(folderId) {
  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, webViewLink, webContentLink)",
      pageSize: 1000,
    });
    const files = res.data.files;
    let allFiles = [];
    for (const file of files) {
      if (file.mimeType === "application/vnd.google-apps.folder") {
        // Recursively fetch files in subfolders
        const subFiles = await listFiles(file.id);
        allFiles = allFiles.concat(subFiles);
      } else {
        allFiles.push(file);
      }
    }
    return allFiles;
  } catch (err) {
    console.error("❌ Error listing files:", err.message);
    return [];
  }
}
