#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}=== Kultura Production Deployment ===${NC}\n"

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

# Step 1: Start shared proxy network (if not already running)
echo -e "${YELLOW}Step 1: Ensuring shared reverse proxy is running...${NC}\n"

if ! docker network inspect proxy-network >/dev/null 2>&1; then
    echo -e "Creating proxy-network..."
fi

if ! docker ps --format '{{.Names}}' | grep -q '^nginx-proxy$'; then
    echo -e "Starting nginx-proxy + acme-companion..."
    cp .env proxy-network/.env 2>/dev/null || true
    docker compose -f proxy-network/docker-compose.yml up -d
    sleep 3
fi

echo -e "${GREEN}✓ Reverse proxy is running${NC}\n"

# Step 2: Start kultura app
echo -e "${YELLOW}Step 2: Starting Kultura app...${NC}\n"

docker compose up -d --build

sleep 5

echo -e "${GREEN}✓ Kultura app started${NC}\n"

# Step 3: Verify
echo -e "${YELLOW}Verifying deployment...${NC}\n"

for svc in nginx-proxy acme-companion kultura-app; do
    if docker ps --format '{{.Names}}' | grep -q "^${svc}$"; then
        echo -e "${GREEN}✓ $svc is running${NC}"
    else
        echo -e "${RED}✗ $svc is not running${NC}"
    fi
done

echo -e "\n${GREEN}=== Deployment Complete ===${NC}"
echo -e "SSL will be auto-provisioned by acme-companion within ~1 minute."
echo -e "Visit ${GREEN}https://$DOMAIN${NC} to verify\n"
