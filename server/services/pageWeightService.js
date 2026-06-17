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

    // Connect directly to the Chrome DevTools Protocol session
    const client = await page.target().createCDPSession();
    await client.send('Network.enable');

    // Accumulate encoded wire size bytes from finished network items
    client.on('Network.loadingFinished', (event) => {
      if (event.encodedDataLength) {
        totalBytes += event.encodedDataLength;
      }
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    return totalBytes;
  } finally {
    await browser.close();
  }
}

module.exports = { getPageWeight };