#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DOMAIN="kultura.id"
EMAIL="your@email.com"

echo -e "${YELLOW}=== Let's Encrypt SSL Certificate Initialization ===${NC}\n"

if [ -f .env ]; then
    export $(cat .env | grep -v '#' | xargs)
    DOMAIN=${DOMAIN:-kultura.id}
    EMAIL=${EMAIL:-your@email.com}
fi

if [ "$EMAIL" = "your@email.com" ]; then
    echo -e "${RED}Error: Please update EMAIL in .env file before running this script${NC}"
    exit 1
fi

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

echo -e "${YELLOW}Step 2: Requesting SSL certificate from Let's Encrypt (standalone mode)...${NC}\n"

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
    echo -e "${RED}Possible causes:${NC}"
    echo -e "  1. Domain is not pointing to your VPS IP"
    echo -e "  2. Port 80 is not accessible from the internet"
    echo -e "  3. DNS has not propagated yet (try waiting 5-30 minutes)"
    exit 1
fi

echo -e "${YELLOW}Step 3: Starting full production stack with SSL certificate...${NC}\n"

docker compose --profile production up -d

sleep 3

echo -e "${GREEN}✓ Production stack started${NC}\n"

echo -e "${YELLOW}Verifying deployment...${NC}\n"

if docker compose ps | grep -q "kultura-app.*running"; then
    echo -e "${GREEN}✓ Kultura service is running${NC}"
else
    echo -e "${RED}✗ Kultura service is not running${NC}"
fi

if docker compose ps | grep -q "nginx.*running"; then
    echo -e "${GREEN}✓ Nginx service is running${NC}"
else
    echo -e "${RED}✗ Nginx service is not running${NC}"
fi

if docker compose ps | grep -q "certbot.*running"; then
    echo -e "${GREEN}✓ Certbot service is running${NC}"
else
    echo -e "${RED}✗ Certbot service is not running${NC}"
fi

echo -e "\n${GREEN}=== Initialization Complete ===${NC}\n"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Visit https://$DOMAIN to verify the certificate"
echo -e "  2. Check logs: docker compose logs -f"
echo -e "  3. Monitor certificate renewal: docker compose exec certbot certbot certificates"
echo -e "\n${YELLOW}Your website should be live at https://$DOMAIN${NC}\n"
