import { Module } from '@nestjs/common';
import { ObjectController } from './object.controller';
import { ObjectService } from './object.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ObjectController],
  providers: [ObjectService, PrismaService],
  exports: [ObjectService],
})
export class ObjectModule {}
