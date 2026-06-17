// server/server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const carbonRoutes = require('./routes/carbonRoutes');
const { generalLimiter } = require('./middleware/rateLimiter');
const AppError = require('./utils/AppError');

const app = express();

app.set('trust proxy', 1);

// ── Database ────────────────────────────────────────────────────────────────
connectDB();

// ── Security & Parsing ──────────────────────────────────────────────────────
app.use(helmet());
app.use(generalLimiter);
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST'],
  })
);
// Body limit: this API only receives { url: "..." } — reject anything larger.
app.use(express.json({ limit: '1kb' }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    message: '[EcoCheck] Website Carbon Footprint Calculator API is running',
    version: '1.0.0',
    endpoints: {
      analyze: 'POST /api/carbon/analyze',
      reports: 'GET  /api/carbon/reports',
    },
  });
});

app.use('/api/carbon', carbonRoutes);

// ── 404 — unknown routes ────────────────────────────────────────────────────
app.use((_req, _res, next) => {
  next(new AppError('Route not found', 404));
});

// ── Global error handler ────────────────────────────────────────────────────
// Operational errors (AppError) → structured response with real message.
// Unexpected errors → generic 500, stack logged server-side only.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  if (!isOperational) {
    console.error('[FATAL] Unexpected error:', err);
  }

  res.status(statusCode).json({
    error: isOperational ? err.message : 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// ── Start ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[READY] Server running on http://localhost:${PORT}`);
});
