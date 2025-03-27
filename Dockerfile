FROM node:18

# Tạo thư mục làm việc
WORKDIR /app

# Copy mã nguồn
COPY . .

# Cài các gói phụ thuộc và Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Cài thư viện Node.js
RUN npm install

# Thiết lập đường dẫn chạy Chromium cho Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Mở cổng 3000
EXPOSE 3000

# Lệnh chạy server
CMD ["node", "server.js"]
