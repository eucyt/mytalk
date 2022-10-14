import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TalkInvitationService } from './talk-invitation.service';

@Controller('talk-invitation')
export class TalkInvitationController {
  constructor(private readonly talkInvitationService: TalkInvitationService) {}

  @Get(':invitationId/accept')
  @UseGuards(JwtAuthGuard)
  async acceptInvitation(
    @Req() req: { user: User },
    @Param('invitationId') invitationId: string,
  ) {
    const invitation = await this.talkInvitationService.accept(
      Number(invitationId),
      req.user.id,
    );
    return { talkId: invitation.talkId };
  }
}
