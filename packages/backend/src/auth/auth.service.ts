import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(displayName: string, email: string, password: string) {
    const user = await this.userService.create({
      displayName,
      email,
      password,
    });

    return this.getTokens(user);
  }

  async login(email: string, password: string) {
    // TODO: make LocalStrategy
    const user = await this.userService.findByEmail(email);
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Email or password is invalid.');
    }
    return this.getTokens(user);
  }

  async renewTokens(refreshToken: string) {
    let payload: {
      sub_refresh: string;
    };

    const invalidErrorMessage = 'Invalid refresh token';

    try {
      payload = this.jwtService.verify<{
        sub_refresh: string;
      }>(refreshToken);
    } catch (e) {
      throw new BadRequestException(invalidErrorMessage);
    }

    const user = await this.userService.find(Number(payload.sub_refresh));

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
    await this.userService.update({
      refreshToken: await hash(refreshToken, 10),
      ...user,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
