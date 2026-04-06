#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}=== Let's Encrypt SSL Certificate Initialization ===${NC}\n"

if [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found. Copy .env.example to .env and fill in DOMAIN and EMAIL${NC}"
    exit 1
fi

export $(cat .env | grep -v '#' | xargs)

if [ -z "$DOMAIN" ]; then
    echo -e "${RED}Error: DOMAIN is not set in .env${NC}"
    exit 1
fi

if [ -z "$EMAIL" ] || [ "$EMAIL" = "your@email.com" ]; then
    echo -e "${RED}Error: Please set a valid EMAIL in .env${NC}"
    exit 1
fi

echo -e "Domain: ${GREEN}$DOMAIN${NC}"
echo -e "Email:  ${GREEN}$EMAIL${NC}\n"

mkdir -p ./certbot-conf ./certbot-www
chmod 777 ./certbot-conf ./certbot-www

if [ -d "./certbot-conf/live/$DOMAIN" ]; then
    echo -e "${YELLOW}Certificate for $DOMAIN already exists. Skipping initialization.${NC}"
    exit 0
fi

echo -e "${YELLOW}Step 1: Ensuring no conflicts on port 80...${NC}\n"

docker compose --profile production down 2>/dev/null || true

if [ -f "./certbot-conf/.certbot.lock" ]; then
    sudo rm -f ./certbot-conf/.certbot.lock
fi

echo -e "${GREEN}✓ Ports cleared${NC}\n"

echo -e "${YELLOW}Step 2: Requesting SSL certificate from Let's Encrypt...${NC}\n"

docker run --rm \
    -v "$(pwd)/certbot-conf:/etc/letsencrypt" \
    -v "$(pwd)/certbot-www:/var/www/certbot" \
    -p 80:80 \
    -p 443:443 \
    certbot/certbot:latest certonly \
    --standalone \
    -d "$DOMAIN" \
    --email "$EMAIL" \
    --agree-tos \
    --non-interactive

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✓ SSL certificate successfully obtained!${NC}\n"
else
    echo -e "\n${RED}Error: Failed to obtain SSL certificate${NC}"
    echo -e "  1. Domain is not pointing to your VPS IP"
    echo -e "  2. Port 80 is not accessible from the internet"
    echo -e "  3. DNS has not propagated yet"
    exit 1
fi

echo -e "${YELLOW}Step 3: Starting full production stack...${NC}\n"

docker compose --profile production up -d

sleep 3

echo -e "${GREEN}✓ Production stack started${NC}\n"

echo -e "${YELLOW}Verifying deployment...${NC}\n"

for svc in kultura-app kultura-nginx kultura-certbot; do
    if docker compose ps | grep -q "$svc.*running"; then
        echo -e "${GREEN}✓ $svc is running${NC}"
    else
        echo -e "${RED}✗ $svc is not running${NC}"
    fi
done

echo -e "\n${GREEN}=== Initialization Complete ===${NC}"
echo -e "Visit ${GREEN}https://$DOMAIN${NC} to verify\n"
