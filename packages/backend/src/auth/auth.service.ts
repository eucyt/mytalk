import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hash } from 'bcryptjs';

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

  async login(user: User) {
    return this.getTokens(user);
  }

  async renewTokens(user: User, refreshToken: string) {
    if (
      !user.refreshToken ||
      !(await compare(refreshToken, user.refreshToken))
    ) {
      throw new BadRequestException('Invalid refresh token');
    }

    return this.getTokens(user);
  }

  private async getTokens(user: User) {
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        expiresIn: '1h',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        subRefresh: user.id,
      },
      {
        expiresIn: '7d',
      },
    );

    // TODO: create and update should be same transaction.
    await this.userService.update({
      ...user,
      refreshToken: await hash(refreshToken, 10),
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async logout(user: User) {
    const _user = await this.userService.update({
      ...user,
      refreshToken: null,
    });
    return _user.refreshToken === null;
  }

  async withdraw(user: User) {
    return !(await this.userService.delete(user.id));
  }

  async findUserByJwt(token: string) {
    try {
      const payload = this.jwtService.verify<{ sub: string }>(token);
      return await this.userService.find(Number(payload.sub));
    } catch (e) {
      throw new BadRequestException('Invalid access token');
    }
  }
}
