import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CollectionService {
  constructor(private prismaService: PrismaService) {}

  async create(name: string) {
    if (!name) {
      throw new BadRequestException(['O nome da coleção é obrigatório']);
    }
    try {
      const collectionFound = await this.findByName(name);

      if (collectionFound) {
        throw new ConflictException([`A coleção '${name}' já está cadastrada`]);
      }

      const collectionSaved = this.prismaService.collection.create({
        data: {
          name,
        },
      });
      return collectionSaved;
    } catch (err) {
      throw err;
    }
  }

  async findById(idCollection: string) {
    const collectionFound = await this.prismaService.collection.findUnique({
      where: { idCollection },
    });

    if (!collectionFound) return null;

    return collectionFound;
  }

  async findByName(name: string) {
    const collectionFound = await this.prismaService.collection.findUnique({
      where: { name },
    });

    if (!collectionFound) return null;

    return collectionFound;
  }

  async findAll() {
    const collections = await this.prismaService.collection.findMany();
    return collections;
  }

  async findAllComplete() {
    const collectionsWithObjects = await this.prismaService.collection.findMany(
      {
        select: {
          idCollection: true,
          name: true,
          object: {
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
          },
        },
      },
    );

    return collectionsWithObjects;
  }

  async findByIdComplete(idCollection: string) {
    const collectionWithObjects =
      await this.prismaService.collection.findUnique({
        where: { idCollection },
        select: {
          name: true,
          object: {
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
          },
        },
      });

    return collectionWithObjects;
  }

  async remove(idCollection: string) {
    if (!idCollection) {
      throw new BadRequestException(['O id da coleção é obrigatório']);
    }
    try {
      const collectionFound = await this.prismaService.collection.findUnique({
        where: { idCollection },
      });

      if (!collectionFound) {
        throw new BadRequestException([
          `Nenhuma coleção encontrada com id ${idCollection}`,
        ]);
      }

      const collectionDeleted = await this.prismaService.collection.delete({
        where: { idCollection },
      });

      return collectionDeleted;
    } catch (err) {
      throw err;
    }
  }

  async update(idCollection: string, name: string) {
    if (!idCollection)
      throw new BadRequestException(['O id da coleção é obrigatório']);
    if (!name)
      throw new BadRequestException(['O nome da coleção é obrigatório']);

    try {
      const collectionFound = await this.prismaService.collection.findUnique({
        where: { idCollection },
      });
      if (!collectionFound)
        throw new BadRequestException([
          `Nenhuma coleção com id ${idCollection} encontrada`,
        ]);

      const collectionUpdated = await this.prismaService.collection.update({
        where: { idCollection },
        data: { name },
      });

      return collectionUpdated;
    } catch (err) {
      throw err;
    }
  }
}
