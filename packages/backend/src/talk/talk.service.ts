import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TalkService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number) {
    return await this.prismaService.talk.create({
      data: {
        users: { connect: { id: userId } },
      },
    });
  }

  async findAll(userId: number) {
    return await this.prismaService.talk.findMany({
      where: {
        users: { some: { id: userId } },
      },
    });
  }
}
