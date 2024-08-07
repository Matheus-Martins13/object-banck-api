import { BadRequestException } from '@nestjs/common';

export class ObjectDto {
  idObject?: string;
  name: string;
  description: string;
  collection: string;
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
    if (!newObject.collection)
      throw new BadRequestException(['A coleção do objeto é obrigatória']);
    if (!newObject.objectFile)
      throw new BadRequestException(['O arquivo do objeto é obrigatório']);
    if (!newObject.user)
      throw new BadRequestException(['O usuário é obrigatório']);
  }
}

export class ObjectUpdateDto {
  name: string;
  description: string;
  collection: string;
  tags?: string;

  static validateObject(objectUpdate: ObjectUpdateDto, idObject: string) {
    if (!objectUpdate.name)
      throw new BadRequestException(['O nome do objeto é obrigatório']);
    if (!objectUpdate.description)
      throw new BadRequestException(['A descrição do objeto é obrigatória']);
    if (!objectUpdate.collection)
      throw new BadRequestException(['A coleção do objeto é obrigatória']);
    if (!idObject)
      throw new BadRequestException(['O id do objeto é obrigatório']);
  }
}
