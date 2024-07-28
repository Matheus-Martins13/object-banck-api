import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { UsersService } from 'src/user/users.service';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(email: string, password: string): Promise<AuthResponseDto> {
    if (!email || !password)
      throw new BadRequestException(`Required: email and password`);

    const foundUser = await this.usersService.findByEmail(email);

    if (!foundUser || !bcryptCompareSync(password, foundUser.passwordHash)) {
      throw new UnauthorizedException([`E-mail ou senha incorretos`]);
    }

    const payload = {
      sub: foundUser.idUser,
      type: foundUser.profile.type,
    };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
