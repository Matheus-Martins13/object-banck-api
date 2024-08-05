import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  create(
    @Body('subcategory') name: string,
    @Body('category') idCategory: string,
  ) {
    return this.subcategoryService.create(name, idCategory);
  }

  @Get()
  findAll() {
    return this.subcategoryService.findAll();
  }

  @Get(':idCategory')
  findAllInCategory(@Param('idCategory') idCategory: string) {
    return this.subcategoryService.findAll(idCategory);
  }

  @Delete(':idCategory')
  remove(@Param('idCategory') idCategory: string) {
    return this.subcategoryService.remove(idCategory);
  }

  @Patch(':idSubcategory')
  update(
    @Param('idSubcategory') idSubcategory: string,
    @Body('name') name: string,
  ) {
    return this.subcategoryService.update(idSubcategory, name);
  }
}
