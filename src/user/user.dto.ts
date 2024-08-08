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

export class UpdateUserDto {
  idUser: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  type: string;
  password?: string;

  static validateDto(updateUserDto: UpdateUserDto, idUser: string) {
    if (!idUser)
      throw new BadRequestException(['O id do usuário é obrigatório']);
    if (!updateUserDto.name)
      throw new BadRequestException(['O nome do usuário é obrigatório']);
    if (!updateUserDto.cpf)
      throw new BadRequestException(['O CPF do usuário é obrigatório']);
    if (!updateUserDto.phone)
      throw new BadRequestException(['O telefone do usuário é obrigatório']);
    if (!updateUserDto.email)
      throw new BadRequestException(['O e-mail do usuário é obrigatório']);
    if (!updateUserDto.type)
      throw new BadRequestException(['O tipo do usuário é obrigatório']);
  }
}
