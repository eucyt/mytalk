FROM node:16 as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY packages/backend/ ./packages/backend/

WORKDIR /usr/src/app/packages/backend

RUN yarn install --prod --frozen-lockfile --ignore-scripts
RUN npx prisma generate
RUN yarn build

FROM node:16-buster-slim

ENV NODE_ENV production
RUN apt-get update -y \
  && apt-get install -y openssl

USER node
WORKDIR /usr/src/app

COPY --from=builder --chown=node:node /usr/src/app/packages/backend/dist/ ./packages/backend/dist/
COPY --from=builder --chown=node:node /usr/src/app/packages/backend/node_modules/ ./packages/backend/node_modules/
COPY --from=builder --chown=node:node /usr/src/app/node_modules/ ./node_modules/

EXPOSE 3000
CMD ["node", "packages/backend/dist/src/main.js"]