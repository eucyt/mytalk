import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly userService: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: { sub_refresh?: string }): Promise<User> {
    if (!payload.sub_refresh) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.find(Number(payload.sub_refresh));

    if (!user) throw new UnauthorizedException('Invalid refresh token');

    return user;
  }
}
