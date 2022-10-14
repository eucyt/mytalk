import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTalkRequest } from './talk.entity';
import { TalkService } from './talk.service';

@Controller('talks')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createTalkRequest: CreateTalkRequest,
    @Req() req: { user: User },
  ) {
    return this.talkService.create(req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: { user: User }) {
    return this.talkService.findAll(req.user.id);
  }
}
