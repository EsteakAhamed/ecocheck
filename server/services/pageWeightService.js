// server/services/pageWeightService.js
const puppeteer = require('puppeteer');

/**
 * Launches headless Chromium, navigates to `url`, and sums all
 * transferred bytes (HTML, CSS, JS, images, fonts, etc.).
 * Browser is always closed in the finally block to prevent leaks.
 * @param {string} url - Fully qualified URL
 * @returns {Promise<number>} Total bytes transferred
 */
async function getPageWeight(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
    ],
  });

  try {
    const page = await browser.newPage();
    let totalBytes = 0;

    // Accumulate bytes from every network response
    page.on('response', async (response) => {
      try {
        const contentLength = response.headers()['content-length'];
        if (contentLength) {
          totalBytes += parseInt(contentLength, 10);
        } else {
          // Fallback: read body buffer when content-length header is absent
          const buffer = await response.buffer().catch(() => null);
          if (buffer) totalBytes += buffer.length;
        }
      } catch {
        // Ignore failures from individual resources (ads, trackers, CORS blocks)
      }
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    return totalBytes;
  } finally {
    await browser.close();
  }
}

module.exports = { getPageWeight };
