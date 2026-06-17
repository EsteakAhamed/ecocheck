// server/services/co2Service.js
const { co2 } = require('@tgwf/co2');

// SWD (Sustainable Web Design) model instance
const co2Emission = new co2({ model: 'swd' });

/**
 * Calculates CO₂ emissions for a single page visit via CO2.js.
 * @param {number} bytes - Total bytes transferred
 * @param {boolean} isGreen - Whether the host runs on renewable energy
 * @returns {{ co2: number, green: boolean, variables: object }}
 */
function calculateEmissions(bytes, isGreen) {
  // Explicit SWD v4 defaults suppress library warnings for undefined options
  return co2Emission.perVisitTrace(bytes, isGreen, {
    dataReloadRatio: 0,
    firstVisitPercentage: 1,
    returnVisitPercentage: 0,
  });
}

/**
 * Maps CO₂ grams to an A+–F rating.
 * Thresholds based on Website Carbon's public methodology.
 * @param {number} co2Grams
 * @returns {string}
 */
function getRating(co2Grams) {
  if (co2Grams <= 0.095) return 'A+';
  if (co2Grams <= 0.186) return 'A';
  if (co2Grams <= 0.341) return 'B';
  if (co2Grams <= 0.493) return 'C';
  if (co2Grams <= 0.656) return 'D';
  if (co2Grams <= 0.846) return 'E';
  return 'F';
}

module.exports = { calculateEmissions, getRating };
