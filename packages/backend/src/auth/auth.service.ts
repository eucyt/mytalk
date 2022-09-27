import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import {
  AccessTokenResponse,
  LoginResponse,
  RegisterResponse,
} from './auth.entity';

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

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || compare(password, user.password)) {
      throw new UnauthorizedException('Email or password is invalid');
    }

    return {
      accessToken: 'todo',
      refreshToken: 'todo',
    };
  }

  async renewAccessToken(refreshToken: string): Promise<AccessTokenResponse> {
    return {
      accessToken: refreshToken + 'todo',
    };
  }
}
