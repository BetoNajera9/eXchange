FROM node:lts-alpine3.14

# Install latest Chromium packages
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    -certificates \
    ttf-freefont \
    tzdata

# Set timezone
RUN cp /usr/share/zoneinfo/America/Lima /etc/localtime

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Add user
RUN addgroup -S exchange && adduser -S -g exchange exchange \
    && mkdir -p /home/exchange/Downloads /usr/src/app \
    && chown -R exchange:exchange /home/exchange \
    && chown -R exchange:exchange /usr/src/app

WORKDIR /usr/src/app
COPY --chown=exchange:exchange . /usr/src/app
RUN npm install
RUN npm run build
RUN npm ci --only=production
USER exchange
CMD "npm" "start"
