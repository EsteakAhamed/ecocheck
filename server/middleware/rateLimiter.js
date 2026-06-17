// server/middleware/rateLimiter.js
// IP-based rate limiting. Two tiers:
// - generalLimiter: broad protection for all routes
// - analyzeLimiter: strict limit on /analyze (Puppeteer is resource-heavy)

const rateLimit = require('express-rate-limit');

/** General API protection — 100 requests per minute per IP */
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again shortly.' },
});

/** Analyze endpoint — 5 requests per minute per IP (Puppeteer is expensive) */
const analyzeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Rate limit exceeded. Please wait before running another analysis.' },
});

module.exports = { generalLimiter, analyzeLimiter };
