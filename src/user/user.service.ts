// imports nestjs
import { BadRequestException, Injectable } from '@nestjs/common';

// imports libs terceiras
import { hashSync as bcryptHashSync } from 'bcrypt';

// imports dto
import { UpdateUserDto, UserDto } from './user.dto';

// imports services
import { removeImage } from 'src/utils/remove-image.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { validateData } from './utils/validate-data.util';
import { validateProfileTypeAndPicture } from './utils/validate-profile-type-and-picture';
import { findByEmail } from './utils/find-by-email.util';
import { findByCpf } from './utils/find-by-cpf.utils';
import { findByPhoneNumber } from './utils/find-by-phone-number.utl';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(newUser: UserDto, photo?: Express.Multer.File) {
    // Config profile type and picture
    const { profileType, profilePicture } = validateProfileTypeAndPicture(
      newUser,
      photo,
    );

    UserDto.validateDto(newUser);

    newUser.profileType = profileType;
    newUser.profilePicture = profilePicture;

    await validateData(newUser, this.prismaService);

    // Config password
    const passwordHash = bcryptHashSync(newUser.password, 10);
    newUser.password = passwordHash;

    try {
      const userSaved = await this.prismaService.user.create({
        data: {
          email: newUser.email,
          passwordHash: newUser.password,
          profile: {
            create: {
              type: newUser.profileType,
            },
          },
          profilePicture: {
            create: newUser.profilePicture,
          },
          person: {
            create: {
              name: newUser.name,
              cpf: newUser.cpf,
              contact: {
                create: {
                  phone: newUser.phone,
                },
              },
            },
          },
        },
      });
      return userSaved;
    } catch (err) {
      removeImage(profilePicture.path);
      throw err;
    }
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findAllComplete() {
    const users = await this.prismaService.user.findMany({
      select: {
        idUser: true,
        email: true,
        profile: {
          select: { type: true },
        },
        person: {
          select: {
            cpf: true,
            name: true,
            contact: { select: { phone: true } },
          },
        },
      },
    });

    return users;
  }

  async findByEmail(email: string) {
    return await findByEmail(email, this.prismaService);
  }

  async findByCpf(cpf: string) {
    return await findByCpf(cpf, this.prismaService);
  }

  async findById(idUser: string) {
    return await this.prismaService.user.findUnique({
      where: { idUser },
      select: {
        idUser: true,
        email: true,
        profile: {
          select: { type: true },
        },
        person: {
          select: {
            cpf: true,
            name: true,
            contact: { select: { phone: true } },
          },
        },
      },
    });
  }

  async findByPhoneNumber(phone: string) {
    return await findByPhoneNumber(phone, this.prismaService);
  }

  async remove(idUser: string) {
    if (!idUser) {
      throw new BadRequestException(['O id do usuário é obrigatório']);
    }
    try {
      const userFound = await this.findById(idUser);

      if (!userFound) {
        throw new BadRequestException([
          `Nenhum usuário encontrado com id ${idUser}`,
        ]);
      }

      const userDeleted = await this.prismaService.user.delete({
        where: { idUser },
      });

      return userDeleted;
    } catch (err) {
      throw err;
    }
  }

  async update(idUser: string, updateUserDto: UpdateUserDto) {
    UpdateUserDto.validateDto(updateUserDto, idUser);

    try {
      const userFound = await this.findById(idUser);

      if (!userFound) {
        throw new BadRequestException([
          `Nenhum usuário encontrado com id ${idUser}`,
        ]);
      }

      if (updateUserDto.password) {
        const passwordHash = bcryptHashSync(updateUserDto.password, 10);
        const userUpdated = await this.prismaService.user.update({
          where: { idUser },
          data: {
            email: updateUserDto.email,
            passwordHash,
            profile: {
              update: {
                type: updateUserDto.type,
              },
            },
            person: {
              update: {
                name: updateUserDto.name,
                cpf: updateUserDto.cpf,
                contact: {
                  update: {
                    phone: updateUserDto.phone,
                  },
                },
              },
            },
          },
        });

        return userUpdated;
      }

      const userUpdated = await this.prismaService.user.update({
        where: { idUser },
        data: {
          email: updateUserDto.email,
          profile: {
            update: {
              type: updateUserDto.type,
            },
          },
          person: {
            update: {
              name: updateUserDto.name,
              cpf: updateUserDto.cpf,
              contact: {
                update: {
                  phone: updateUserDto.phone,
                },
              },
            },
          },
        },
      });

      return userUpdated;
    } catch (err) {
      throw err;
    }
  }
}
