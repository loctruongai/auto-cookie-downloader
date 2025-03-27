const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    console.log("🚀 Launching Puppeteer...");

    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
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
    console.log("✅ Page loaded, extracting cookies...");

    const cookies = await page.cookies();

    // Ghi file cookies theo format chuẩn Netscape (cho yt-dlp)
    const cookieString = cookies.map(c => 
      `.youtube.com\tTRUE\t/\tFALSE\t0\t${c.name}\t${c.value}`
    ).join('\n');

    fs.writeFileSync('cookies.txt', cookieString);
    console.log("✅ Cookies saved to cookies.txt");

    await browser.close();
    console.log("🧹 Browser closed.");

  } catch (err) {
    console.error("❌ Error occurred:", err);
    process.exit(1);
  }
})();
