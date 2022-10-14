import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTalkInvitationRequest, CreateTalkRequest } from './talk.entity';
import { TalkService } from './talk.service';

@Controller('talks')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTalkRequest: CreateTalkRequest,
    @Req() req: { user: User },
  ) {
    return await this.talkService.create(req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req: { user: User }) {
    return await this.talkService.findAll(req.user.id);
  }

  @Post(':id/invite')
  @UseGuards(JwtAuthGuard)
  async invite(
    @Param('id') talkId: string,
    @Req() req: { user: User },
    @Body() createTalkInvitationRequest: CreateTalkInvitationRequest,
  ) {
    await this.talkService.invite(
      Number(talkId),
      req.user.id,
      createTalkInvitationRequest.inviteeEmail,
    );
  }

  @Get(':talkId/invite/:invitationId/accept')
  @UseGuards(JwtAuthGuard)
  async acceptInvitation(
    @Req() req: { user: User },
    @Param('invitationId') invitationId: string,
  ) {
    const invitation = await this.talkService.acceptInvitation(
      Number(invitationId),
      req.user.id,
    );
    return { talkId: invitation.talkId };
  }
}
