#!/usr/bin/env bash

set -eu -o pipefail

yarn install

docker-compose build
