import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TalkInvitationModule } from './talk-invitation/talk-invitation.module';
import { TalkModule } from './talk/talk.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    TalkModule,
    TalkInvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
