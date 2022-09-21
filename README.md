# MyTalk

MyTalk - messaging web app

## Setup

```
yarn install
docker-compose -f ./packages/infra/docker/docker-compose.local.yml up -d mysql
cp packages/backend/.env.local packages/backend/.env
yarn back dev
yarn front start
```
