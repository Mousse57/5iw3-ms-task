FROM node:18-alpine as builder

ENV NODE_ENV build

WORKDIR /app

RUN npm i -g pnpm


COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install -P

COPY . .
RUN pnpm build

FROM keymetrics/pm2:18-alpine as runner

ARG APP_ENV=prod

ENV APP_ENV=${APP_ENV}

USER node
WORKDIR /app

COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/dist/ ./dist/

CMD pm2 start dist/main.js && pm2 logs