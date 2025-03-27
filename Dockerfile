FROM node:18

WORKDIR /app
COPY . .

RUN apt-get update && \
    apt-get install -y ffmpeg chromium && \
    npm install

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

EXPOSE 3000
CMD ["node", "server.js"]
