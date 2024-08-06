import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.categoryService.create(name);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/find-complet-by-id/:idCategory')
  async findByIdComplet(@Param('idCategory') idCategory: string) {
    return await this.categoryService.findByIdComplet(idCategory);
  }

  @Get('/find-all-complet')
  findAllWithObjects() {
    return this.categoryService.findAllComplet();
  }

  @Delete(':idCategory')
  remove(@Param('idCategory') idCategory: string) {
    return this.categoryService.remove(idCategory);
  }

  @Patch(':idCategory')
  update(@Param('idCategory') idCategory: string, @Body('name') name: string) {
    return this.categoryService.update(idCategory, name);
  }
}
