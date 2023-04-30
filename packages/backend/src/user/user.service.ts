import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: number) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async create(user: { displayName: string; email: string; password: string }) {
    const { password, ...remaining } = user;
    return await this.prismaService.user.create({
      data: {
        password: await hash(password, 10),
        ...remaining,
      },
    });
  }

  async update(user: User) {
    // @ts-expect-error updatedAt is autofill
    delete user.updatedAt;
    return await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        ...user,
      },
    });
  }

  //TODO: soft delete
  async delete(id: number) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
