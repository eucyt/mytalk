import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async create(user: { displayName: string; email: string; password: string }) {
    const { password, ...remaining } = user;
    return this.prismaService.user.create({
      data: {
        password: await hash(password, 10),
        ...remaining,
      },
    });
  }

  async update(user: User) {
    delete user.updatedAt;
    return this.prismaService.user.update({
      where: { id: user.id },
      data: {
        ...user,
      },
    });
  }
}
