import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { Strategy as BaseLocalStrategy } from 'passport-local';

import { UserService } from '../user/user.service';

/**
 * @description emailとpasswordを使った認証処理を行うクラス
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
