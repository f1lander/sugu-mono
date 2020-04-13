# Inspiration taken from:
# https://codefresh.io/docker-tutorial/node_docker_multistage/
# https://hackernoon.com/a-tale-of-two-docker-multi-stage-build-layers-85348a409c84

FROM node:12.16.2-alpine AS base
RUN apk add --virtual builds-deps build-base && apk add --update --no-cache python make g++
WORKDIR /srv/sugu-services
COPY ./packages/sugu-services/package.json ./
RUN yarn install
COPY ./packages/sugu-services ./

FROM base as dev
CMD yarn run dev

FROM base AS build
RUN yarn format
RUN yarn lint
RUN yarn test
RUN yarn build
RUN npm prune --production

FROM node:12.16.2-alpine
COPY --from=build /srv/sugu-services/node_modules node_modules
COPY --from=build /srv/sugu-services/dist dist
EXPOSE 3000
CMD ["node", "./dist/server.js"]
