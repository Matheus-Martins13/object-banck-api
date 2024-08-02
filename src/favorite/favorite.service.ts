import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteDto } from './favorote.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(favoriteDto: FavoriteDto) {
    FavoriteDto.validateDto(favoriteDto);
    try {
      const favoriteSaved = await this.prismaService.favorite.create({
        data: { idObject: favoriteDto.idObject, idUser: favoriteDto.idUser },
      });
      return favoriteSaved;
    } catch (err) {
      throw err;
    }
  }

  async findFavorite(favoriteDto: FavoriteDto) {
    FavoriteDto.validateDto(favoriteDto);

    try {
      const favoriteFound = this.prismaService.favorite.findFirst({
        where: { idUser: favoriteDto.idUser, idObject: favoriteDto.idObject },
      });

      if (!favoriteFound) return null;

      return favoriteFound;
    } catch (err) {
      throw err;
    }
  }

  async remove(idFavorite: string) {
    if (!idFavorite)
      throw new BadRequestException(['O id do favorito é obrigatório']);

    try {
      const favoriteFound = await this.prismaService.favorite.findUnique({
        where: { idFavorite },
      });

      if (!favoriteFound)
        throw new BadRequestException([
          `Nenhum favorito com id '${idFavorite}'`,
        ]);

      const favoriteDeleted = await this.prismaService.favorite.delete({
        where: { idFavorite },
      });

      return favoriteDeleted;
    } catch (err) {
      throw err;
    }
  }
}
