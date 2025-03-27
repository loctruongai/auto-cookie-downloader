const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Endpoint: Tạo cookies mới
app.get('/get-cookies', async (req, res) => {
  exec('node get_cookies.js', (error, stdout, stderr) => {
    if (error) return res.status(500).send(stderr);
    return res.send('✅ Cookies refreshed');
  });
});

// Endpoint: Tải video
app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send('Thiếu tham số URL');

  const command = `yt-dlp --cookies cookies.txt -f best -o "video.mp4" ${videoUrl}`;
  exec(command, (error, stdout, stderr) => {
    if (error) return res.status(500).send(stderr);
    return res.download('video.mp4', 'video.mp4', () => {
      fs.unlinkSync('video.mp4');
    });
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
