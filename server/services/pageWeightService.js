const axios = require('axios');
const AppError = require('../utils/AppError');

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const TYPE_LABELS = {
  document: 'HTML',
  stylesheet: 'CSS',
  script: 'JavaScript',
  image: 'Images',
  font: 'Fonts',
  media: 'Media',
  other: 'Other',
};

function normalizeType(rawType) {
  const type = (rawType || 'other').toLowerCase();
  return TYPE_LABELS[type] ? type : 'other';
}

/**
 * Builds a per-resource-type byte breakdown from a Lighthouse audits object.
 * Prefers `resource-summary`; falls back to aggregating `network-requests`
 * by resourceType if resource-summary isn't present in the response (its
 * availability has varied across Lighthouse/PSI versions). 'total' and
 * 'third-party' entries are excluded — third-party overlaps other categories
 * (e.g. a third-party script is still "script"), so including it would
 * double-count against the additive breakdown.
 * Returns null if no usable data is found — treat as optional, not guaranteed.
 */
function extractBreakdown(audits) {
  const totals = {};

  const summaryItems = audits?.['resource-summary']?.details?.items;
  if (Array.isArray(summaryItems) && summaryItems.length) {
    for (const item of summaryItems) {
      if (item.resourceType === 'total' || item.resourceType === 'third-party') continue;
      const type = normalizeType(item.resourceType);
      const bytes = item.transferSize ?? item.size ?? 0;
      totals[type] = (totals[type] || 0) + bytes;
    }
  } else {
    const networkItems = audits?.['network-requests']?.details?.items;
    if (Array.isArray(networkItems) && networkItems.length) {
      for (const item of networkItems) {
        const type = normalizeType(item.resourceType);
        totals[type] = (totals[type] || 0) + (item.transferSize || 0);
      }
    }
  }

  const entries = Object.entries(totals)
    .filter(([, bytes]) => bytes > 0)
    .map(([type, bytes]) => ({ type, label: TYPE_LABELS[type], bytes }))
    .sort((a, b) => b.bytes - a.bytes);

  return entries.length ? entries : null;
}

/**
 * @param {string} url
 * @returns {Promise<{ bytes: number, breakdown: Array<{type:string,label:string,bytes:number}>|null }>}
 */
async function getPageWeight(url) {
  const apiKey = process.env.GOOGLE_PSI_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_PSI_API_KEY is not configured');
  }

  try {
    const { data } = await axios.get(PSI_ENDPOINT, {
      params: {
        url,
        key: apiKey,
        strategy: 'desktop',
        category: 'performance',
      },
      timeout: 120000,
    });

    const audits = data?.lighthouseResult?.audits;
    const totalBytes = audits?.['total-byte-weight']?.numericValue;

    if (typeof totalBytes !== 'number') {
      throw new AppError('PageSpeed Insights did not return a byte weight value', 502);
    }

    return {
      bytes: Math.round(totalBytes),
      breakdown: extractBreakdown(audits),
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err.code === 'ECONNABORTED') {
      throw new AppError(
        'This page took too long to analyze — it may be unusually large or complex. Please try again later.',
        504
      );
    }
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.error?.message || 'PageSpeed Insights request failed';
      if (status === 429) {
        throw new AppError('Analysis quota exceeded — please try again in a moment', 429);
      }
      throw new AppError(message, 502);
    }
    throw err;
  }
}

module.exports = { getPageWeight };