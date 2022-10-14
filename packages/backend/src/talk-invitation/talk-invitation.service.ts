import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TalkInvitationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findInvitedAll(inviteeId: number) {
    return await this.prismaService.talkInvitation.findMany({
      where: { inviteeId: inviteeId },
      include: { inviter: true },
    });
  }

  async accept(invitationId: number, inviteeId: number) {
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

    await this.prismaService.talk.update({
      where: { id: invitation.talkId },
      data: {
        users: {
          connect: { id: inviteeId },
        },
      },
    });

    return await this.prismaService.talkInvitation.update({
      where: { id: invitationId },
      data: { acceptedAt: new Date() },
    });
  }
}
