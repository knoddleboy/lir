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
COPY --from=pruned /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --prefer-offline --frozen-lockfile

# build the project
COPY --from=pruned /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm exec turbo build --filter=@lir/api...

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --prefer-offline --frozen-lockfile --prod

# final stage
FROM base

WORKDIR /app

COPY --from=build --chown=node:node /app .

CMD ["pnpm", "--filter=@lir/api", "start:prod"]