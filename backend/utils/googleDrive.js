/*const { google } = require('googleapis');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const KEYFILE = path.join(__dirname, '../service_account.json'); // downloaded JSON

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILE,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

async function listFilesInFolder(folderId) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(id, name, mimeType)',
  });
  return res.data.files;
}

module.exports = { drive, listFilesInFolder };*/
