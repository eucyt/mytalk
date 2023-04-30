# MyTalk

MyTalk - messaging web app

## Setup

```
yarn install
docker-compose -f ./packages/infra/docker/docker-compose.local.yml up -d
cp packages/backend/.env.local packages/backend/.env
yarn back start:dev
yarn front dev
cd packages/backend
npx prisma migrate dev
npx prisma db seed
cd ../..
```
