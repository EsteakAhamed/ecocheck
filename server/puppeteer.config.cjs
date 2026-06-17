const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    // Forces Puppeteer to download Chrome inside your project folder so Render bundles it
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};