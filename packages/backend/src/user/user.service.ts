import { Injectable } from '@nestjs/common';
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
}
