// server/controllers/carbonController.js
const { getPageWeight } = require('../services/pageWeightService');
const { checkGreenHosting } = require('../services/greenHostService');
const { calculateEmissions, getRating } = require('../services/co2Service');
const Report = require('../models/Report');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * POST /api/carbon/analyze
 * Orchestrates: page weight + green hosting (parallel) → CO₂ calc → persist → respond.
 */
const analyzeWebsite = asyncHandler(async (req, res) => {
  const { url } = req.body;

  // ── Input validation ────────────────────────────────────────────────────
  if (!url || typeof url !== 'string' || !url.trim()) {
    throw new AppError('URL is required', 400);
  }

  let targetUrl;
  try {
    targetUrl = new URL(url.trim());
  } catch {
    throw new AppError(
      'Please enter a valid URL including the protocol (e.g. https://example.com)',
      400
    );
  }

  if (!['http:', 'https:'].includes(targetUrl.protocol)) {
    throw new AppError('Only http:// and https:// URLs are supported', 400);
  }

  // ── Core pipeline (parallel I/O) ───────────────────────────────────────
  console.log(`[MEASURE] Measuring page weight for: ${targetUrl.href}`);
  console.log(`[GREEN_HOST] Checking green hosting for: ${targetUrl.hostname}`);

  const [bytes, { green: isGreen, hostedBy }] = await Promise.all([
    getPageWeight(targetUrl.href),
    checkGreenHosting(targetUrl.hostname),
  ]);

  // ── Emissions calculation ──────────────────────────────────────────────
  const emissions = calculateEmissions(bytes, isGreen);
  const co2Grams = emissions.co2;
  const pageSizeKB = parseFloat((bytes / 1024).toFixed(2));
  const rating = getRating(co2Grams);

  const result = {
    url: targetUrl.href,
    bytes,
    pageSizeKB,
    green: isGreen,
    hostedBy,
    co2PerVisit: co2Grams,
    rating,
    // Annual estimate: 10,000 monthly visits × 12 months
    annualCO2Kg: parseFloat(((co2Grams * 10000 * 12) / 1000).toFixed(4)),
  };

  // ── Persist (fire-and-forget — don't block the response) ──────────────
  Report.create({
    url: result.url,
    bytes: result.bytes,
    pageSizeKB: result.pageSizeKB,
    green: result.green,
    co2PerVisit: result.co2PerVisit,
    rating: result.rating,
  }).catch((err) => console.error('[WARN] Failed to save report:', err.message));

  console.log(`[SUCCESS] Analysis complete: ${co2Grams.toFixed(4)}g CO₂ (${rating})`);
  return res.status(200).json(result);
});

/**
 * GET /api/carbon/reports
 * Returns the 50 most recent reports.
 */
const getReports = asyncHandler(async (_req, res) => {
  const reports = await Report.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .lean(); // Plain JS objects — skips Mongoose hydration overhead
  return res.status(200).json(reports);
});

module.exports = { analyzeWebsite, getReports };
