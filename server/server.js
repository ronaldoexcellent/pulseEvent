require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, // Matches your frontend URL exactly
  credentials: true, // This MUST be true to allow cookies
}));

app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet());
app.use(cookieParser()); // Required to read cookies in incoming requests

// ROUTES
const authRoutes = require('./routes/auth');

// 2. Mount them to specific URL paths
app.use('/api', authRoutes);
// app.use('/api/tickets', ticketRoutes);

// Cron Job
require('./tasks/cleanupTokens');

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});