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

    const listTags: [] = JSON.parse(object.tags);

    try {
      const objectSaved = await this.prismaService.object.create({
        data: {
          name: object.name,
          description: object.description,
          category: { connect: { idCategory: object.category } },
          subcategory: { connect: { idSubcategory: object.subcategory } },
          user: { connect: { idUser: object.user } },
          tag: {
            connect: listTags?.map((tag: any) => ({
              idTag: tag.idTag,
            })),
          },
          objectFile: {
            create: {
              name: object.objectFile.name,
              mimetype: object.objectFile.mimetype,
              path: object.objectFile.path,
              size: object.objectFile.size,
            },
          },
          objectPicture: {
            create: { name: object.thumb.name, path: object.thumb.path },
          },
        },
      });
      return objectSaved;
    } catch (err) {
      throw err;
    }
  }
}
