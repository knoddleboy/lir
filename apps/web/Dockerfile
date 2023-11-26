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
RUN pnpm exec turbo prune --scope=@lir/web --docker

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
RUN pnpm exec turbo build --filter=@lir/web...

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --prefer-offline --frozen-lockfile --prod

# final stage
FROM base

WORKDIR /app

COPY --from=build /app/apps/web/next.config.js .
COPY --from=build /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=node:node /app/apps/web/.next/standalone ./
COPY --from=build --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=node:node /app/apps/web/public ./apps/web/public

CMD ["node", "apps/web/server.js"]