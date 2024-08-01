import { BadRequestException } from '@nestjs/common';

export class FavoriteDto {
  idFavorite?: string;
  idUser: string;
  idObject: string;

  static validateDto(favorite: FavoriteDto) {
    if (!favorite.idUser)
      throw new BadRequestException([`O id do usuário é obrigatório`]);
    if (!favorite.idObject)
      throw new BadRequestException(['O id do objeto é obrigatório']);
  }
}
