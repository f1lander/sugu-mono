#!/usr/bin/env bash

set -o pipefail

echo Clearing Docker logs...
if [[ "$OSTYPE" == "msys" ]]; then
  docker run --privileged -v //var/run/docker.sock:/var/run/docker.sock docker:18.09.5 \
    docker run --net=host --ipc=host --uts=host --pid=host --security-opt=seccomp=unconfined --privileged --rm -v //:/host alpine \
      find //host/var/lib/docker/containers/ -type f -name "*.log" -delete -print
else
  docker run --net=host --ipc=host --uts=host --pid=host --security-opt=seccomp=unconfined --privileged --rm -v /:/host alpine \
    find /host/var/lib/docker/containers/ -type f -name "*.log" -delete -print
fi
echo Docker logs cleared.

docker-compose up
