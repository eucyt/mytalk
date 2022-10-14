import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TalkModule } from './talk/talk.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, TalkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
