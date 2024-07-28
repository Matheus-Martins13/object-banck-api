import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body('name') name: string) {
    return this.tagService.create(name);
  }

  @Get()
  async findAll() {
    return await this.tagService.findAll();
  }
}
