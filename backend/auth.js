// auth.js
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// __dirname workaround for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

// Step 1: Generate auth URL
export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });
}

// Step 2: Exchange code for tokens and save them
export async function saveTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const tokenPath = path.join(__dirname, "tokens.json");
  fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));

  console.log("✅ Tokens saved to", tokenPath);
  return tokens;
}

if (process.argv[1].includes("auth.js")) {
  console.log("👉 Auth URL:", getAuthUrl());
}

