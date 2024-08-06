import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    if (!name) {
      throw new BadRequestException(['O nome da categoria é obrigatório']);
    }
    try {
      const categoryFound = await this.findByName(name);

      if (categoryFound) {
        throw new ConflictException([
          `A categoria '${name}' já está cadastrada`,
        ]);
      }

      const categorySaved = this.prisma.category.create({
        data: {
          name,
        },
      });
      return categorySaved;
    } catch (err) {
      throw err;
    }
  }

  async findById(idCategory: string) {
    const categoryFound = await this.prisma.category.findUnique({
      where: { idCategory },
    });

    if (!categoryFound) return null;

    return categoryFound;
  }

  async findByName(name: string) {
    const categoryFound = await this.prisma.category.findUnique({
      where: { name: name },
    });

    if (!categoryFound) return null;

    return categoryFound;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async findAllComplet() {
    const categoriesWithObjects = await this.prisma.category.findMany({
      include: {
        subcategory: {
          select: {
            idSubcategory: true,
            name: true,
            object: {
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
            },
          },
        },
      },
    });

    return categoriesWithObjects;
  }

  async findByIdComplet(idCategory: string) {
    const categoryWithObjects = await this.prisma.category.findUnique({
      where: { idCategory },
      include: {
        subcategory: {
          select: {
            idSubcategory: true,
            name: true,
            object: {
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
            },
          },
        },
      },
    });

    return categoryWithObjects;
  }

  async remove(idCategory: string) {
    if (!idCategory) {
      throw new BadRequestException(['O id da categoria é obrigatório']);
    }
    try {
      const categoryFound = await this.prisma.category.findUnique({
        where: { idCategory },
      });

      if (!categoryFound) {
        throw new BadRequestException([
          `Nenhuma categoria encontrada com id ${idCategory}`,
        ]);
      }

      const categoryDeleted = await this.prisma.category.delete({
        where: { idCategory },
      });

      return categoryDeleted;
    } catch (err) {
      throw err;
    }
  }

  async update(idCategory: string, name: string) {
    if (!idCategory)
      throw new BadRequestException(['O id da categoria é obrigatório']);
    if (!name)
      throw new BadRequestException(['O nome da categoria é obrigatório']);

    try {
      const categoryFound = await this.prisma.category.findUnique({
        where: { idCategory },
      });
      if (!categoryFound)
        throw new BadRequestException([
          `Nenhuma categoria com id ${idCategory} encontrada`,
        ]);

      const categoryUpdated = await this.prisma.category.update({
        where: { idCategory },
        data: { name },
      });

      return categoryUpdated;
    } catch (err) {
      throw err;
    }
  }
}
