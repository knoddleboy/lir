# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-alpine AS base

# https://pnpm.io/docker#example-2-build-multiple-docker-images-in-a-monorepo
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# prune dependencies
FROM base as pruned
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN pnpm add turbo --global

COPY . .
RUN pnpm exec turbo prune --scope=@lir/api --docker

FROM base as build
RUN apk add --no-cache libc6-compat

WORKDIR /app

# install pruned dependencies
COPY --from=pruned /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile

# build the project
COPY turbo.json turbo.json
COPY --from=pruned /app/out/full/ .
RUN pnpm exec turbo build --filter=@lir/api...

FROM base

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# This line is fucked up - increases image by 700 MB out of nothing
COPY --from=build --chown=node:node /app/node_modules/.pnpm ./node_modules/.pnpm

COPY --from=build --chown=node:node /app/packages ./packages
COPY --from=build --chown=node:node /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=build --chown=node:node /app/apps/api/dist ./apps/api/dist

COPY --chown=node:node .env ./apps/api/.env

WORKDIR /app/apps/api

CMD node dist/main.js