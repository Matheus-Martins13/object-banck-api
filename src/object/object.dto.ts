import { BadRequestException } from '@nestjs/common';

export class ObjectDto {
  idObject?: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  tags?: string;
  thumb: { name: string; path: string };
  objectFile: {
    name: string;
    path: string;
    mimetype: string;
    size: number;
  };
  user: string;

  static validateObject(newObject: ObjectDto) {
    if (!newObject.name)
      throw new BadRequestException(['O nome do objeto é obrigatório']);
    if (!newObject.description)
      throw new BadRequestException(['A descrição do objeto é obrigatória']);
    if (!newObject.category)
      throw new BadRequestException(['A categoria do objeto é obrigatória']);
    if (!newObject.subcategory)
      throw new BadRequestException(['A subcategoria do objeto é obrigatória']);
    if (!newObject.objectFile)
      throw new BadRequestException(['O arquivo do objeto é obrigatório']);
    if (!newObject.user)
      throw new BadRequestException(['O usuário é obrigatório']);
  }
}
