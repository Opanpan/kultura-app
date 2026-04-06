#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}=== Kultura Production Deployment ===${NC}\n"

if [ ! -f .env ]; then
    echo -e "${RED}Error: .env not found. Copy .env.example to .env and configure it.${NC}"
    exit 1
fi

export $(cat .env | grep -v '#' | xargs)

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ] || [ "$EMAIL" = "your@email.com" ]; then
    echo -e "${RED}Error: Set valid DOMAIN and EMAIL in .env${NC}"
    exit 1
fi

echo -e "Domain: ${GREEN}$DOMAIN${NC}"
echo -e "Email:  ${GREEN}$EMAIL${NC}\n"

# Step 1: Start shared proxy if not running
if ! docker ps --format '{{.Names}}' | grep -q '^nginx-proxy$'; then
    echo -e "${YELLOW}Starting shared reverse proxy...${NC}\n"
    cp .env proxy-network/.env 2>/dev/null || true
    docker compose -f proxy-network/docker-compose.yml up -d
    sleep 3
    echo -e "${GREEN}✓ Reverse proxy started${NC}\n"
else
    echo -e "${GREEN}✓ Reverse proxy already running${NC}\n"
fi

# Step 2: Deploy app
bash init-deploy.sh
