import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcrypt';
import { RegisterResponse } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(email: string, password: string): Promise<RegisterResponse> {
    await this.prismaService.user.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    });
    return {
      accessToken: 'todo',
      refreshToken: 'todo',
    };
  }
}
