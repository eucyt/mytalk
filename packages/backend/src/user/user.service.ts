import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async create(user: Omit<User, 'id'>) {
    const { password, refreshToken, ...remaining } = user;
    return this.prismaService.user.create({
      data: {
        password: await hash(password, 10),
        refreshToken: await hash(refreshToken, 10),
        ...remaining,
      },
    });
  }

  async update(user: User) {
    const { id, password, refreshToken, ...remaining } = user;
    return this.prismaService.user.update({
      where: { id },
      data: {
        password: await hash(password, 10),
        refreshToken: await hash(refreshToken, 10),
        ...remaining,
      },
    });
  }
}
