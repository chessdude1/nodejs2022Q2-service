# syntax=docker/dockerfile:1

FROM node:16.14.2-alpine AS base

WORKDIR /app

COPY [ "package.json", "npm.lock*", "./" ]

FROM base AS dev
ENV NODE_ENV=dev
RUN npm install --legacy-peer-deps
COPY . .
CMD [ "npm","run", "start:dev" ]
