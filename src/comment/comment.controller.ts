import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() comment: CommentDto) {
    return await this.commentService.create(comment);
  }

  @Get(':idObject')
  async findAllByObject(@Param('idObject') idObject: string) {
    return await this.commentService.findAllByObject(idObject);
  }
}
