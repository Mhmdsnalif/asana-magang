import {
  Controller,
  Request,
  Body,
  Post,
  UseGuards,
  Get,
  Put,
  Param,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../../modules/users/user.dto';
import { UserExistGuard } from 'src/core/guards/UserExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    try {
      const result = await this.authService.login(req.user);
      return result;
    } catch (error) {
      return { message: error.message, statusCode: error.status };
    }
  }

  @UseGuards(UserExistGuard)
  @Post('/user')
  async create(@Body() user: UserDto) {
    return await this.authService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  async getDataUser(@Request() req) {
    return await this.authService.getDataUser();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update-password/:userId')
  async updatePassword(
    @Param('userId') userId: number,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    await this.authService.updatePassword(userId, currentPassword, newPassword);
    return { message: 'Password updated successfully' };
  }

  // auth.controller.ts

  @UseGuards(AuthGuard('jwt'))
  @Put('/update-user/:userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: Partial<UserDto>,
  ) {
    try {
      // Panggil metode updateUser dari service
      const updatedUser = await this.authService.updateUser(
        userId,
        updateUserDto,
      );

      // Jika pembaruan berhasil, kembalikan data pengguna yang diperbarui
      return { message: 'User updated successfully', user: updatedUser };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Terjadi kesalahan dalam mengupdate pengguna.',
      );
    }
  }
}
