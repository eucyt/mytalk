import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TalkService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
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
    });
  }

  async invite(talkId: number, inviterId: number, inviteeEmail: string) {
    const talk = await this.prismaService.talk.findUnique({
      where: { id: talkId },
      include: { users: true },
    });
    if (!talk || !(inviterId in talk.users.map((item) => item.id))) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const invitee = await this.userService.findByEmail(inviteeEmail);
    if (!invitee) {
      return null;
    }

    return this.prismaService.talkInvitation.create({
      data: { talkId: talkId, inviterId: inviterId, inviteeId: invitee.id },
    });
  }

  async acceptInvitation(invitationId: number, inviteeId: number) {
    const invitation = await this.prismaService.talkInvitation.findUnique({
      where: { id: invitationId },
    });

    if (
      !invitation ||
      invitation.inviteeId !== inviteeId ||
      invitation.acceptedAt !== null
    ) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.talkInvitation.update({
      where: { id: invitationId },
      data: { acceptedAt: new Date() },
    });
  }
}
