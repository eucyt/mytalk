import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'test.alice@test.com' },
    update: {},
    create: {
      email: 'test.alice@test.com',
      displayName: 'Alice',
      password: await hash('Password!0Alice', 10),
      refreshToken: await hash('refreshTokenAlice', 10),
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'test.bob@test.com' },
    update: {},
    create: {
      email: 'test.bob@test.com',
      displayName: 'Bob',
      password: await hash('Password!0Bob', 10),
      refreshToken: await hash('refreshTokenBob', 10),
    },
  });
  console.log({ alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
