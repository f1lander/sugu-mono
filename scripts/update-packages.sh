#!/usr/bin/env bash

set -eu -o pipefail

docker-compose stop

docker-compose build --parallel

# Remove old containers
docker ps -a | grep sugu_ | grep -v CONTAINER | awk '{print $1 }' | xargs -I {} docker rm {} || true

# Remove old node_modules volumes
docker volume rm sugu-mono_sugu-services-node_modules || true
docker volume rm sugu-mono_sugu-ui-node_modules || true

# Prune old container images
docker image prune -f

# Recreate containers
docker-compose up --no-start
