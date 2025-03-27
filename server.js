const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const app = express();

app.get('/get-cookies', async (req, res) => {
  try {
    console.log("Launching Puppeteer...");
    const browser = await puppeteer.launch({
      headless: 'new',
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

    const cookies = await page.cookies();
    await browser.close();

    // Format thành file `.txt` theo định dạng `yt-dlp` yêu cầu
    const cookieText = cookies.map(c => `${c.name}\t${c.value}`).join('\n');

    // Trả file về client
    res.setHeader('Content-disposition', 'attachment; filename=youtube_cookies.txt');
    res.setHeader('Content-Type', 'text/plain');
    res.send(cookieText);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send('Failed to get cookies');
  }
});

app.get('/', (req, res) => {
  res.send("Auto Cookie Downloader is running!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
