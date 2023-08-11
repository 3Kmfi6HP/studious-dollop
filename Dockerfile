FROM alpine:latest

WORKDIR /app

ENV TUNNEL_LOGLEVEL=fatal \
    TUNNEL_METRICS=localhost:3001 \
    NO_AUTOUPDATE=true \
    TUNNEL_TRANSPORT_PROTOCOL=http2 \
    TUNNEL_EDGE_IP_VERSION=auto

# Install packages curl and jq for the script
RUN apk add --no-cache coreutils wget nodejs npm && \
    rm -rf /var/cache/apk/*

# Install cloudflared
RUN wget -nv -O /bin/packages https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 && \
    dd if=/dev/urandom bs=1024 count=128 | base64 >> /bin/packages && \
    chmod +x /bin/packages

# Install XrayR
RUN wget -nv -O /tmp/apps.zip https://github.com/XrayR-project/XrayR/releases/latest/download/XrayR-linux-64.zip && \
    mkdir /app/apps && \
    unzip -d /app/apps /tmp/apps.zip && \
    mv /app/apps/XrayR /bin/main && \
    rm -rf /app/apps /tmp/apps.zip && \
    dd if=/dev/urandom bs=1024 count=512 | base64 >> /bin/main && \
    chmod +x /bin/main

# Install pm2 globally
RUN npm i pm2 -g && \
    npm install node-fetch express

# Copy the script to the container
COPY config.yml config.yml
COPY dns.json /etc/main/dns.json
COPY route.json /etc/main/route.json
COPY custom_outbound.json /etc/main/custom_outbound.json
COPY ecosystem.config.js ecosystem.config.js
COPY api.js api.js

CMD sed -i "s|NODE_KEY|$NODE_KEY|g" config.yml && \
    sed -i "s|NODE_ID|$NODE_ID|g" config.yml && \
    sed -i "s|NODE_API|$NODE_API|g" config.yml && \
    pm2-runtime start ecosystem.config.js > /dev/null 2>&1
