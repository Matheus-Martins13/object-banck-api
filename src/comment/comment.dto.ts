import { BadRequestException } from '@nestjs/common';

export class CommentDto {
  idObject: string;
  idUser: string;
  comment: string;

  static validateComment(comment: CommentDto) {
    if (!comment.idObject)
      throw new BadRequestException(['O id do objeto é obrigatório']);
    if (!comment.idUser)
      throw new BadRequestException(['O id do usuário é obrigatório']);
    if (!comment.comment)
      throw new BadRequestException(['O comentário é obrigatório']);
  }
}
