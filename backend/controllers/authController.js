const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Step 1: Redirect to Google OAuth consent
exports.googleOAuth = (req, res) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).send('Missing GOOGLE_CLIENT_ID in .env');
  }

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // get refresh token
    scope: ['https://www.googleapis.com/auth/drive.readonly'], // read-only access
  });

  console.log('Redirecting to:', url); // debug
  res.redirect(url);
};

// Step 2: Handle Google OAuth callback
exports.googleCallback = async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);

    res.send('Google OAuth successful! You can now access your Drive files.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving Google tokens');
  }
};

exports.googleOAuth = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  console.log('OAuth URL:', url); // make sure redirect_uri is in the URL
  res.redirect(url);
};

