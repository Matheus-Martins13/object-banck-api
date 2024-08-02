import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './comment.dto';
import { validateData } from './utils/validate-data';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(comment: CommentDto) {
    CommentDto.validateComment(comment);
    try {
      await validateData(comment, this.prismaService);

      const commentSaved = await this.prismaService.comment.create({
        data: {
          description: comment.comment,
          user: { connect: { idUser: comment.idUser } },
          object: { connect: { idObject: comment.idObject } },
        },
        include: {
          user: {
            select: {
              idUser: true,
              person: { select: { name: true } },
              profilePicture: { select: { path: true } },
            },
          },
        },
      });

      const commentFormatted = {
        idComment: commentSaved.idComment,
        idUser: commentSaved.idUser,
        idObject: commentSaved.idObject,
        description: commentSaved.description,
        createdAt: commentSaved.createdAt,
        updatedAt: commentSaved.updatedAt,
        user: {
          name: commentSaved.user.person.name,
          profilePicture: commentSaved.user.profilePicture,
        },
      };

      return commentFormatted;
    } catch (err) {
      throw err;
    }
  }

  async findAllByObject(idObject: string) {
    if (!idObject) return null;

    const commentsFound = await this.prismaService.comment.findMany({
      where: { idObject },
      include: {
        user: {
          select: {
            idUser: true,
            person: { select: { name: true } },
            profilePicture: { select: { path: true } },
          },
        },
      },
    });

    const commentsFormatted = commentsFound.map((comment) => {
      return {
        idComment: comment.idComment,
        idUser: comment.idUser,
        idObject: comment.idObject,
        description: comment.description,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        user: {
          name: comment.user.person.name,
          profilePicture: comment.user.profilePicture,
        },
      };
    });

    return commentsFormatted;
  }
}
