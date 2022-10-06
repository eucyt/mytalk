import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import {
  AccessTokenResponse,
  LoginResponse,
  RegisterResponse,
} from './auth.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    displayName: string,
    email: string,
    password: string,
  ): Promise<RegisterResponse> {
    const user = await this.userService.create({
      displayName,
      email,
      password,
      refreshToken: undefined,
    });

    return this.getTokens(user);
  }

  // NOTE: Should validate user by passport-local in controller.
  async login(user: User): Promise<LoginResponse> {
    return this.getTokens(user);
  }

  async renewTokens(refreshToken: string): Promise<AccessTokenResponse> {
    let payload: {
      userId: string;
    };

    const invalidErrorMessage = 'Invalid refresh token';

    try {
      payload = this.jwtService.verify<{
        userId: string;
      }>(refreshToken);
    } catch (e) {
      throw new BadRequestException(invalidErrorMessage);
    }

    const user = await this.userService.find(Number(payload.userId));

    if (!user || !(await compare(refreshToken, user.refreshToken))) {
      throw new BadRequestException(invalidErrorMessage);
    }

    return this.getTokens(user);
  }

  private async getTokens(user: User) {
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub_refresh: user.id,
      },
      {
        expiresIn: '7d',
      },
    );

    // TODO: create and update should be same transaction.
    await this.userService.update({ refreshToken, ...user });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
