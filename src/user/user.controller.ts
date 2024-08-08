import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer/multer-config';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  create(@Body() user: UserDto, @UploadedFile() photo: Express.Multer.File) {
    return this.usersService.create(user, photo);
  }

  @UseGuards(AuthGuard)
  @Get('find-by-email/:username')
  async findByUserName(@Param() params: { email: string }) {
    return await this.usersService.findByEmail(params.email);
  }

  @Get('/find-all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/find-all-complete')
  findAllComplete() {
    return this.usersService.findAllComplete();
  }

  @Delete(':idUser')
  async remove(@Param('idUser') idUser: string) {
    return this.usersService.remove(idUser);
  }

  @Patch(':idUser')
  async update(
    @Param('idUser') idUser: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(idUser, updateUserDto);
  }
}
