import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { TalkGateway } from './talk.gateway';

@Injectable()
export class TalkService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly talkGateway: TalkGateway,
  ) {}

  async create(userId: number) {
    return await this.prismaService.talk.create({
      data: {
        users: { connect: { id: userId } },
      },
    });
  }

  async findAll(userId: number) {
    return await this.prismaService.talk.findMany({
      where: {
        users: { some: { id: userId } },
      },
      include: { users: true },
    });
  }

  async findOne(talkId: number) {
    return await this.prismaService.talk.findUnique({
      where: { id: talkId },
      include: { users: true, messages: { include: { sender: true } } },
    });
  }

  async createMessage(content: string, user: User, talkId: number) {
    const message = await this.prismaService.message.create({
      data: {
        content: content,
        sender: { connect: { id: user.id } },
        talk: { connect: { id: talkId } },
      },
      include: {
        sender: true,
      },
    });

    // TODO: emit message crated_at
    this.talkGateway.server.to(String(talkId)).emit('newMessage', {
      senderName: message.sender.displayName,
      content: message.content,
    });
  }

  async inviteToTalk(talkId: number, inviterId: number, inviteeEmail: string) {
    const invitee = await this.userService.findByEmail(inviteeEmail);
    if (!invitee) {
      return null;
    }

    return this.prismaService.talkInvitation.upsert({
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        talkId_inviterId_inviteeId: {
          talkId: talkId,
          inviterId: inviterId,
          inviteeId: invitee.id,
        },
      },
      create: { talkId: talkId, inviterId: inviterId, inviteeId: invitee.id },
      update: {},
    });
  }

  async isCorrectTalkMember(userId: number, talkId: number) {
    const talk = await this.prismaService.talk.findUnique({
      where: { id: talkId },
      include: { users: true },
    });
    return talk?.users.map((item) => item.id).includes(userId);
  }
}
