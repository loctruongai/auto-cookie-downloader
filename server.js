const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const app = express();

app.get('/get-cookies', async (req, res) => {
  try {
    console.log("🚀 Launching Puppeteer...");

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--single-process',
        '--no-zygote',
        '--disable-extensions',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-sync',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-first-run'
      ]
    });

    const page = await browser.newPage();
    await page.goto('https://youtube.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log("✅ Page loaded, extracting cookies...");

    const cookies = await page.cookies();
    await browser.close();
    console.log("🎯 Cookies extracted & browser closed.");

    // Format theo chuẩn yt-dlp
    const cookieText = cookies.map(c =>
      `.youtube.com\tTRUE\t/\tFALSE\t0\t${c.name}\t${c.value}`
    ).join('\n');

    res.setHeader('Content-disposition', 'attachment; filename=youtube_cookies.txt');
    res.setHeader('Content-Type', 'text/plain');
    res.send(cookieText);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).send('Failed to get cookies');
  }
});

app.get('/', (req, res) => {
  res.send("✅ Auto Cookie Downloader is running!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
