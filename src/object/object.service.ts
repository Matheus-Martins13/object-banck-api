import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ObjectDto, ObjectUpdateDto } from './object.dto';
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
          collection: { connect: { idCollection: object.collection } },
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

  async findById(idObject: string) {
    const objectFound = await this.prismaService.object.findUnique({
      where: { idObject },
      select: {
        user: {
          select: { idUser: true, person: { select: { name: true } } },
        },
        collection: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        description: true,
        idObject: true,
        objectFile: true,
        objectPicture: true,
        tag: true,
      },
    });

    if (!objectFound) return null;

    return objectFound;
  }

  async findAll() {
    return await this.prismaService.object.findMany();
  }

  async update(idObject: string, objectUpdate: ObjectUpdateDto) {
    ObjectUpdateDto.validateObject(objectUpdate, idObject);
    await this.validateData(objectUpdate);

    const listTags: [] = JSON.parse(objectUpdate.tags);
    try {
      const objectUpdated = await this.prismaService.object.update({
        where: { idObject: idObject },
        data: {
          name: objectUpdate.name,
          description: objectUpdate.description,
          collection: { connect: { idCollection: objectUpdate.collection } },
          tag: {
            connect: listTags?.map((tag: any) => ({
              idTag: tag.idTag,
            })),
          },
        },
      });

      return objectUpdated;
    } catch (err) {
      throw err;
    }
  }

  private async validateData(objectUpdate: ObjectUpdateDto) {
    try {
      const collectionFound = await this.prismaService.collection.findUnique({
        where: { idCollection: objectUpdate.collection },
      });

      if (!collectionFound)
        throw new BadRequestException([
          `Nenhuma coleção com id ${objectUpdate.collection} encontrada`,
        ]);
    } catch (err) {
      throw err;
    }
  }

  async remove(idObject: string) {
    if (!idObject) {
      throw new BadRequestException(['O id do objeto é obrigatório']);
    }
    try {
      const objectFound = await this.prismaService.object.findUnique({
        where: { idObject },
      });

      if (!objectFound) {
        throw new BadRequestException([
          `Nenhum objeto encontrada com id ${idObject}`,
        ]);
      }

      const objectDeleted = await this.prismaService.object.delete({
        where: { idObject },
      });

      return objectDeleted;
    } catch (err) {
      throw err;
    }
  }
}
