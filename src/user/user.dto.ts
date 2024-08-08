import { BadRequestException } from '@nestjs/common';

import { removeImage } from 'src/utils/remove-image.util';

export enum UserStatusEnum {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

export enum ProfileTypeEnum {
  ALUNO = 'ALUNO',
  ADMINISTRADOR = 'ADMINISTRADOR',
}

export interface UserExtracted {
  email: string;
  password: string;
}

export interface ProfileExtracted {
  type: string;
}

export class ProfilePictureExtracted {
  name: string;
  path: string;
}

export class UserDto {
  idUser?: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  status: string;
  profilePicture: ProfilePictureExtracted;
  profileType: string;

  static validateDto(newUser: UserDto) {
    const validateEmail = (email: string) => {
      const re: RegExp = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    const requiredProps = ['name', 'cpf', 'phone', 'email', 'password'];

    if (
      !newUser.name ||
      !newUser.cpf ||
      !newUser.phone ||
      !newUser.email ||
      !newUser.password
    ) {
      removeImage(newUser.profilePicture.path);
      throw new BadRequestException([
        'Required data: ' + requiredProps.join(', '),
      ]);
    }

    if (!validateEmail(newUser.email)) {
      removeImage(newUser.profilePicture.path);
      throw new BadRequestException(['E-mail inválido']);
    }
  }
}
