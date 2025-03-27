const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('https://www.youtube.com', { waitUntil: 'networkidle2' });

  // (Tùy chọn) Login bằng cookie trước đã lưu hoặc credentials
  // Hoặc dùng bản công khách nếu chỉ cần bypass bot

  const cookies = await page.cookies();
  const cookieString = cookies.map(c => `${c.name}=${c.value}`).join('; ');
  fs.writeFileSync('cookies.txt', cookieString);
  console.log('✅ Cookies updated');
  await browser.close();
})();
