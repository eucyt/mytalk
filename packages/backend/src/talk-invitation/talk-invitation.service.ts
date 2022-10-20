import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TalkInvitationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async findInvitedAll(inviteeId: number) {
    return await this.prismaService.talkInvitation.findMany({
      where: { inviteeId: inviteeId, acceptedAt: null },
      include: { inviter: true },
    });
  }

  /*
    join invited talk as a member
    If the invited talk does not exist, create talk and join the talk together with inviter.
   */
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

    if (invitation.talkId !== null) {
      await this.prismaService.talk.update({
        where: { id: invitation.talkId },
        data: {
          users: {
            connect: { id: inviteeId },
          },
        },
      });
    } else {
      const talk = await this.prismaService.talk.create({
        data: {
          users: {
            connect: [{ id: inviteeId }, { id: invitation.inviterId }],
          },
        },
      });
      invitation.talkId = talk.id;
    }

    return await this.prismaService.talkInvitation.update({
      where: { id: invitationId },
      data: { acceptedAt: new Date(), talkId: invitation.talkId },
    });
  }

  async create(inviterId: number, inviteeEmail: string) {
    const invitee = await this.userService.findByEmail(inviteeEmail);
    if (!invitee) {
      return null;
    }

    return this.prismaService.talkInvitation.create({
      data: { inviterId: inviterId, inviteeId: invitee.id },
    });
  }
}
