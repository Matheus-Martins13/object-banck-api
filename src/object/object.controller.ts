import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { ObjectService } from './object.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectDto, ObjectUpdateDto } from './object.dto';
import objectFileMulterConfig from './multer/objectFile-multer-config';

@Controller('object')
export class ObjectController {
  constructor(private readonly objectService: ObjectService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'objectFile' }], objectFileMulterConfig),
  )
  async uploadVariosArquivos(
    @UploadedFiles()
    files: Express.MulterS3.File[],
    @Body() object: ObjectDto,
  ) {
    return this.objectService.create(object, files);
  }

  @Get(':idObject')
  async findById(@Param('idObject') idObject: string) {
    return await this.objectService.findById(idObject);
  }

  @Get('find-all')
  async findAll() {
    return await this.objectService.findAll();
  }

  @Get('find-by-type/:type')
  async findByType(@Param('type') type: string) {
    return await this.objectService.findByType(type);
  }

  @Patch(':idObject')
  update(
    @Param('idObject') idObject: string,
    @Body() objectUpdate: ObjectUpdateDto,
  ) {
    return this.objectService.update(idObject, objectUpdate);
  }

  @Delete(':idObject')
  remove(@Param('idObject') idObject: string) {
    return this.objectService.remove(idObject);
  }
}
