import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(comment: CommentDto) {
    CommentDto.validateComment(comment);

    try {
      const commentSaved = await this.prismaService.comment.create({
        data: {
          description: comment.comment,
          user: { connect: { idUser: comment.idUser } },
          object: { connect: { idObject: comment.idObject } },
        },
      });

      return commentSaved;
    } catch (err) {
      throw err;
    }
  }

  async findAllByObject(idObject: string) {
    if (!idObject) return null;

    const objectsFound = await this.prismaService.comment.findMany({
      where: { idObject: idObject },
    });

    return objectsFound;
  }
}
