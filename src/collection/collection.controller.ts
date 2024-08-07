import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.collectionService.create(name);
  }

  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @Get('/find-complete-by-id/:idCollection')
  async findByIdComplet(@Param('idCollection') idCollection: string) {
    return await this.collectionService.findByIdComplete(idCollection);
  }

  @Get('/find-all-complete')
  findAllWithObjects() {
    return this.collectionService.findAllComplete();
  }

  @Delete(':idCollection')
  remove(@Param('idCollection') idCollection: string) {
    return this.collectionService.remove(idCollection);
  }

  @Patch(':idCollection')
  update(
    @Param('idCollection') idCollection: string,
    @Body('name') name: string,
  ) {
    return this.collectionService.update(idCollection, name);
  }
}
