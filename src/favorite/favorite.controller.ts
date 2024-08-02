import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDto } from './favorote.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async create(@Body() favoriteDto: FavoriteDto) {
    return await this.favoriteService.create(favoriteDto);
  }

  @Post('find-favorite')
  async findFavorite(@Body() favoriteDto: FavoriteDto) {
    return await this.favoriteService.findFavorite(favoriteDto);
  }

  @Delete(':idFavorite')
  async remove(@Param('idFavorite') idFavorite: string) {
    return await this.favoriteService.remove(idFavorite);
  }
}
