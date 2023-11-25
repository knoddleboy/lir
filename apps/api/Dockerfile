# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

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
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# build the project
COPY --from=pruned /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm build --filter=@lir/api...

# final stage
FROM base

WORKDIR /app

COPY --chown=node:node --from=build /app/.npmrc /app/package.json /app/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

COPY --chown=node:node --from=build /app .

CMD ["pnpm", "--filter=@lir/api", "start:prod"]