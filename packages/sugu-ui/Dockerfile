# https://medium.com/@shakyShane/lets-talk-about-docker-artifacts-27454560384f 
FROM node:12.16.2-alpine AS dev
WORKDIR /srv/sugu-ui
COPY ./packages/sugu-ui/package.json ./packages/sugu-ui/yarn.lock ./
RUN yarn install
COPY ./packages/sugu-ui ./
CMD yarn start

FROM dev AS builder
RUN yarn build

FROM nginx:1.17.9-alpine
COPY --from=builder /srv/sugu-ui/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]