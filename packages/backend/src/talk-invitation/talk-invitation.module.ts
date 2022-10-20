import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { TalkInvitationController } from './talk-invitation.controller';
import { TalkInvitationService } from './talk-invitation.service';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [TalkInvitationController],
  providers: [TalkInvitationService],
})
export class TalkInvitationModule {}
