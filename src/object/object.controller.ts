import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { ObjectService } from './object.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import objectFileMulterConfig from './multer/objectFile-multer-config';
import { ObjectDto } from './object.dto';

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
}
