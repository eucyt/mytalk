import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { Strategy } from 'passport-local';

import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Email or password is invalid.');
    }

    return user;
  }
}
