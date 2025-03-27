FROM node:18

WORKDIR /app
COPY . .

# Cài Chromium & các thư viện phụ trợ cần thiết cho Puppeteer
RUN apt-get update && \
    apt-get install -y \
    chromium \
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
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    wget \
    ca-certificates \
    ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Skip Puppeteer Chromium download
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]
