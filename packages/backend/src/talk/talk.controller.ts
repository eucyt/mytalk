import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  InviteToTalkRequest,
  CreateTalkRequest,
  CreateMessageRequest,
} from './talk.entity';
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
    const talk = await this.talkService.create(req.user.id);
    return { id: talk.id };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req: { user: User }) {
    const talks = await this.talkService.findAll(req.user.id);
    return {
      talks: talks.map((talk) => ({
        id: talk.id,
        users: talk.users.map((user) => ({
          id: user.id,
          displayName: user.displayName,
        })),
        latestMessage: talk.messages.slice(-1)[0] ?? undefined,
      })),
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') talkId: string, @Req() req: { user: User }) {
    if (
      !(await this.talkService.isCorrectTalkMember(req.user.id, Number(talkId)))
    ) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const talk = (await this.talkService.findOne(Number(talkId)))!;
    return {
      messages: talk.messages.map((message) => ({
        senderId: message.sender.id,
        senderName: message.sender.displayName,
        content: message.content,
      })),
      users: talk.users.map((user) => ({
        id: user.id,
        displayName: user.displayName,
      })),
    };
  }

  @Post(':id/message')
  @UseGuards(JwtAuthGuard)
  async createMessage(
    @Param('id') talkId: string,
    @Body() createMessageRequest: CreateMessageRequest,
    @Req() req: { user: User },
  ) {
    if (
      !(await this.talkService.isCorrectTalkMember(req.user.id, Number(talkId)))
    ) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.talkService.createMessage(
      createMessageRequest.message,
      req.user,
      Number(talkId),
    );
  }

  @Post(':id/invite')
  @UseGuards(JwtAuthGuard)
  async invite(
    @Param('id') talkId: string,
    @Req() req: { user: User },
    @Body() createTalkInvitationRequest: InviteToTalkRequest,
  ) {
    if (
      !(await this.talkService.isCorrectTalkMember(req.user.id, Number(talkId)))
    ) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.talkService.inviteToTalk(
      Number(talkId),
      req.user.id,
      createTalkInvitationRequest.inviteeEmail,
    );
  }
}
