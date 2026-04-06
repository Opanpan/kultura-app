#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}=== App Deployment ===${NC}\n"

# Check .env
if [ ! -f .env ]; then
    echo -e "${RED}Error: .env not found. Copy .env.example to .env and configure it.${NC}"
    exit 1
fi

export $(cat .env | grep -v '#' | xargs)

if [ -z "$DOMAIN" ]; then
    echo -e "${RED}Error: DOMAIN is not set in .env${NC}"
    exit 1
fi

echo -e "Domain: ${GREEN}$DOMAIN${NC}\n"

# Ensure shared proxy is running
if ! docker ps --format '{{.Names}}' | grep -q '^nginx-proxy$'; then
    echo -e "${RED}Error: nginx-proxy is not running.${NC}"
    echo -e "Start it first: ${YELLOW}docker compose -f /path/to/proxy-network/docker-compose.yml up -d${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Shared proxy is running${NC}\n"

# Deploy app
echo -e "${YELLOW}Building and starting app...${NC}\n"

docker compose up -d --build

sleep 5

# Verify
APP_CONTAINER=$(docker compose ps --format '{{.Name}}' | head -1)

if docker ps --format '{{.Names}}' | grep -q "$APP_CONTAINER"; then
    echo -e "${GREEN}✓ $APP_CONTAINER is running${NC}"
else
    echo -e "${RED}✗ $APP_CONTAINER failed to start${NC}"
    echo -e "Check logs: docker compose logs"
    exit 1
fi

echo -e "\n${GREEN}=== Done ===${NC}"
echo -e "SSL will be auto-provisioned within ~1 minute."
echo -e "Visit ${GREEN}https://$DOMAIN${NC}\n"
