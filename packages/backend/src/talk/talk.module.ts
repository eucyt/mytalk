import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TalkController } from './talk.controller';
import { TalkService } from './talk.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TalkController],
  providers: [TalkService],
})
export class TalkModule {}
