const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');

const app = express();

app.get('/get-cookies', async (req, res) => {
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
    console.log("✅ Page loaded. Extracting cookies...");

    const cookies = await page.cookies();
    await browser.close();
    console.log("🧹 Browser closed.");

    // Format cookie theo chuẩn Netscape cho yt-dlp
    const cookieText = cookies.map(c =>
      `.youtube.com\tTRUE\t/\tFALSE\t0\t${c.name}\t${c.value}`
    ).join('\n');

    // Trả file về client
    res.setHeader('Content-Disposition', 'attachment; filename="youtube_cookies.txt"');
    res.setHeader('Content-Type', 'text/plain');
    res.send(cookieText);
    console.log("✅ Cookies sent to client.");
  } catch (err) {
    console.error("❌ Error getting cookies:", err);
    res.status(500).send('Failed to get cookies');
  }
});

app.get('/', (req, res) => {
  res.send("✅ Auto Cookie Downloader is running!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🌐 Server is running on http://localhost:${PORT}`);
});
