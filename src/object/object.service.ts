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

  async findById(idObject: string) {
    const objectFound = await this.prismaService.object.findUnique({
      where: { idObject },
      select: {
        user: {
          select: { idUser: true, person: { select: { name: true } } },
        },
        category: true,
        subcategory: true,
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
    console.log(objectUpdate);

    ObjectUpdateDto.validateObject(objectUpdate, idObject);
    await this.validateData(objectUpdate);

    const listTags: [] = JSON.parse(objectUpdate.tags);
    try {
      const objectUpdated = await this.prismaService.object.update({
        where: { idObject: idObject },
        data: {
          name: objectUpdate.name,
          description: objectUpdate.description,
          category: { connect: { idCategory: objectUpdate.category } },
          subcategory: { connect: { idSubcategory: objectUpdate.subcategory } },
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
      const categoryFound = await this.prismaService.category.findUnique({
        where: { idCategory: objectUpdate.category },
      });

      if (!categoryFound)
        throw new BadRequestException([
          `Nenhuma categoria com id ${objectUpdate.category} encontrada`,
        ]);

      const subcategoryFound = await this.prismaService.subcategory.findUnique({
        where: { idSubcategory: objectUpdate.subcategory },
      });

      if (!subcategoryFound)
        throw new BadRequestException([
          `Nenhuma subcategoria com id ${objectUpdate.subcategory} encontrada`,
        ]);
    } catch (err) {
      throw err;
    }
  }

  async remove(idObject: string) {
    if (!idObject) {
      throw new BadRequestException(['O id da categoria é obrigatório']);
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
