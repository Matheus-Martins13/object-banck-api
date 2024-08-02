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

  @Get('/find-all-with-objects')
  findAllWithObjects() {
    return this.categoryService.findAllWithObjects();
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
