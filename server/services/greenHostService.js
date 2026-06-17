// server/services/greenHostService.js
const axios = require('axios');

/**
 * Checks whether a domain is hosted on renewable-energy infrastructure
 * via the Green Web Foundation's Greencheck API.
 * Fails gracefully — returns non-green on any error.
 * @param {string} domain - Domain name (e.g. "example.com")
 * @returns {Promise<{ green: boolean, hostedBy: string|null }>}
 */
async function checkGreenHosting(domain) {
  try {
    const { data } = await axios.get(
      `https://api.thegreenwebfoundation.org/api/v3/greencheck/${domain}`,
      { timeout: 8000 }
    );
    return {
      green: Boolean(data.green),
      hostedBy: data.hosted_by || null,
    };
  } catch (err) {
    // Non-critical — degrade gracefully, don't block the pipeline
    console.warn(`[WARN] Green hosting check failed for "${domain}": ${err.message}`);
    return { green: false, hostedBy: null };
  }
}

module.exports = { checkGreenHosting };
