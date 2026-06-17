// server/routes/carbonRoutes.js
const express = require('express');
const router = express.Router();
const { analyzeWebsite, getReports } = require('../controllers/carbonController');
const { analyzeLimiter } = require('../middleware/rateLimiter');

// POST /api/carbon/analyze — rate-limited (Puppeteer is resource-heavy)
router.post('/analyze', analyzeLimiter, analyzeWebsite);

// GET /api/carbon/reports — last 50 audit records
router.get('/reports', getReports);

module.exports = router;
