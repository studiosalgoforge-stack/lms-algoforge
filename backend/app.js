require('dotenv').config(); // <-- MUST be first

const express = require('express');
const authRoutes = require('./routes/authRoutes');

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID); // debug

const app = express();
app.use('/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
