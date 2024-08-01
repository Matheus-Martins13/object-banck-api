import { Body, Controller, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDto } from './favorote.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() favoriteDto: FavoriteDto) {
    return this.favoriteService.create(favoriteDto);
  }
}
