import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string) {
    if (!name) throw new BadRequestException('O nome da tag é obrigatório');
    return await this.prisma.tag.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    return await this.prisma.tag.findMany();
  }
}
