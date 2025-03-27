const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    console.log("Starting Puppeteer...");
    const browser = await puppeteer.launch({
      headless: 'new', // dùng 'new' cho Puppeteer >= 22
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--no-zygote',
        '--single-process'
      ]
    });

    const page = await browser.newPage();
    await page.goto('https://youtube.com', { waitUntil: 'domcontentloaded' });
    console.log("Page loaded. Getting cookies...");

    const cookies = await page.cookies();
    fs.writeFileSync('cookies.txt', cookies.map(c => `${c.name}\t${c.value}`).join('\n'));

    await browser.close();
    console.log("Cookies saved successfully.");
  } catch (err) {
    console.error("Error occurred:", err);
  }
})();
