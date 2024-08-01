import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteDto } from './favorote.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}

  create(favoriteDto: FavoriteDto) {
    FavoriteDto.validateDto(favoriteDto);
    try {
      const favoriteSaved = this.prismaService.favorite.create({
        data: { idObject: favoriteDto.idObject, idUser: favoriteDto.idUser },
      });
      return favoriteSaved;
    } catch (err) {
      throw err;
    }
  }
}
