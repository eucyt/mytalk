import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [UserService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
