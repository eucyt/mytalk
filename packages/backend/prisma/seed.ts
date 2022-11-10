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
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'test.bob@test.com' },
    update: {},
    create: {
      email: 'test.bob@test.com',
      displayName: 'Bob',
      password: await hash('Password!0Bob', 10),
    },
  });

  const tom = await prisma.user.upsert({
    where: { email: 'test.tom@test.com' },
    update: {},
    create: {
      email: 'test.tom@test.com',
      displayName: 'Tom',
      password: await hash('Password!0Tom', 10),
    },
  });

  console.log({ alice, bob, tom });

  const talkAlice = await prisma.talk.create({
    data: { users: { connect: [{ id: alice.id }] } },
    include: { users: true },
  });

  const talkAliceBob = await prisma.talk.create({
    data: { users: { connect: [{ id: alice.id }, { id: bob.id }] } },
    include: { users: true },
  });

  const talkAliceTom = await prisma.talk.create({
    data: { users: { connect: [{ id: alice.id }, { id: tom.id }] } },
    include: { users: true },
  });

  console.log({ talkAlice, talkAliceBob, talkAliceTom });

  const talkInvitation = await prisma.talkInvitation.create({
    data: { inviterId: alice.id, inviteeId: bob.id, talkId: talkAlice.id },
  });

  console.log(talkInvitation);

  const messageInTalkAlice = await prisma.message.create({
    data: {
      talkId: talkAlice.id,
      senderId: alice.id,
      content: 'test message1',
    },
  });

  const messageInTalkAliceBob = await prisma.message.createMany({
    data: [
      {
        talkId: talkAliceBob.id,
        senderId: alice.id,
        content: 'test message2',
      },
      {
        talkId: talkAliceBob.id,
        senderId: alice.id,
        content: 'test message3',
      },
      {
        talkId: talkAliceBob.id,
        senderId: bob.id,
        content: 'test message4',
      },
    ],
  });

  console.log(messageInTalkAlice);
  console.log(messageInTalkAliceBob);
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
