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
import { UserDto, UserRole } from '../../modules/users/user.dto';
import { DoesUserExist } from 'src/core/guards/UserExist.guard';
import { hasRoles } from './decorators/roles.decorators';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { ApiParam } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @ApiParam({ name: 'username', description: 'Username', type: 'string' })
  @ApiParam({ name: 'password', description: 'Password', type: 'string' })
  async login(@Request() req) {
    try {
      const result = await this.authService.login(req.user);
      return result;
    } catch (error) {
      return { message: error.message, statusCode: error.status };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user/by-nip/:nip')
  async getUserByNip(@Param('nip') nip: number) {
    try {
      // Panggil metode findByNip dari AuthService untuk mencari pengguna berdasarkan NIP
      const user = await this.authService.findByNip(nip);

      // Kembalikan data pengguna yang ditemukan
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(
        'Terjadi kesalahan dalam mencari data pengguna berdasarkan NIP.',
      );
    }
  }

  @hasRoles(UserRole.SUPERADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard, DoesUserExist)
  @ApiParam({ name: 'nip', description: 'NIP', type: 'number' })
  @ApiParam({ name: 'name', description: 'Name', type: 'string' })
  @ApiParam({ name: 'email', description: 'Email', type: 'string' })
  @ApiParam({ name: 'password', description: 'Password', type: 'string' })
  @ApiParam({ name: 'role', description: 'Role', type: 'enum' })
  @Post('/signup')
  async create(@Body() user: UserDto) {
    return await this.authService.create(user);
  }

  @hasRoles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
