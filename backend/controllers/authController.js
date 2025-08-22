import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Needed because __dirname doesn’t exist in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("GOOGLE_REDIRECT_URI:", process.env.GOOGLE_REDIRECT_URI);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Load existing tokens if available
const tokenPath = path.join(__dirname, "../tokens.json");
if (fs.existsSync(tokenPath)) {
  const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
  oauth2Client.setCredentials(tokens);
  console.log("✅ Tokens loaded into oauth2Client");
}

// Step 1: Redirect to Google OAuth consent
export const googleOAuth = (req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).send("Missing GOOGLE_CLIENT_ID in .env");
  }

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // ✅ ensures refresh_token
    prompt: "consent", // ✅ force Google to return refresh_token every time
    scope: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  console.log("OAuth URL:", url);
  res.redirect(url);
};

// Step 2: Handle Google OAuth callback
export const googleCallback = async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);

    // Save tokens.json for future use
    const tokenPath = path.join(__dirname, "../tokens.json");
    fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));

    res.send("✅ Google OAuth successful! Tokens saved. You can now access your Drive files.");
  } catch (err) {
    console.error("Error retrieving Google tokens:", err);
    res.status(500).send("Error retrieving Google tokens");
  }
};
