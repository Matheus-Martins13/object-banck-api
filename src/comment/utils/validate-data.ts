import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from '../comment.dto';
import { BadRequestException } from '@nestjs/common';

export const validateData = async (
  comment: CommentDto,
  prismaService: PrismaService,
) => {
  const userFound = await prismaService.user.findUnique({
    where: { idUser: comment.idUser },
  });

  if (!userFound)
    throw new BadRequestException([
      `Usuário com id '${comment.idUser}' não encontrado`,
    ]);

  const objectFound = await prismaService.object.findUnique({
    where: { idObject: comment.idObject },
  });

  if (!objectFound)
    throw new BadRequestException([
      `Objeto com id '${comment.idObject}' não encontrado`,
    ]);
};
