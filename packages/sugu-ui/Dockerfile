# https://medium.com/@shakyShane/lets-talk-about-docker-artifacts-27454560384f

FROM node:12.16.2-alpine AS base
WORKDIR /srv/sugu-ui
COPY ./packages/sugu-ui/package.json ./
RUN yarn install
COPY ./packages/sugu-ui ./

FROM base as dev
CMD yarn start

FROM base AS build
RUN yarn format
RUN yarn lint
RUN yarn test
RUN yarn build
RUN npm prune --production

FROM node:12.16.2-alpine
COPY --from=build /srv/sugu-ui/node_modules node_modules
COPY --from=build /srv/sugu-ui/build build
EXPOSE 3000
CMD ["node", "./build/index.js"]
