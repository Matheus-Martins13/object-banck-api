import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ObjectDto } from './object.dto';
import { validateFiles } from './utils/validate-files/validate-files';

@Injectable()
export class ObjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(object: ObjectDto, files: Express.MulterS3.File[]) {
    const { objectFile, thumb } = validateFiles(object, files);

    object.objectFile = objectFile;
    object.thumb = thumb;

    ObjectDto.validateObject(object);

    try {
      const objectSaved = await this.prismaService.object.create({
        data: {
          name: object.name,
          description: object.description,
          category: { connect: { idCategory: object.category } },
          subcategory: { connect: { idSubcategory: object.subcategory } },
          user: { connect: { idUser: object.user } },
        },
      });
      return objectSaved;
    } catch (err) {
      throw err;
    }
  }
}
