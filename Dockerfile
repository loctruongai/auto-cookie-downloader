FROM node:18

# Install necessary dependencies for Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    fonts-noto-color-emoji \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxi6 \
    libnss3 \
    libatk-bridge2.0-0 \
    libxrandr2 \
    libasound2 \
    libgtk-3-0 \
    wget \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app
COPY . .

# Install Node packages
RUN npm install

# Puppeteer env vars
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

EXPOSE 10000
CMD ["node", "server.js"]
