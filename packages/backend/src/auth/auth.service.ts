import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcrypt';
import { RegisterResponse } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(email: string, password: string): Promise<RegisterResponse> {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    });
    return {
      id: user.id,
      email: user.email,
    };
  }
}
