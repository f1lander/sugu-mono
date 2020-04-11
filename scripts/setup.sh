#!/usr/bin/env bash

set -eu -o pipefail

yarn install

docker-compose up --build -d
docker-compose down
