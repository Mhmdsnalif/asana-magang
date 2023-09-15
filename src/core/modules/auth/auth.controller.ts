import {
  Controller,
  Request,
  Body,
  Post,
  UseGuards,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../../modules/users/user.dto';
import { DoesUserExist } from 'src/core/guards/UserExist.guard';

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

  @UseGuards(DoesUserExist)
  @Post('/signup')
  async create(@Body() user: UserDto) {
    return await this.authService.create(user);
  }

  @Get('/signup')
  async getDataUser(@Request() req) {
    return await this.authService.getDataUser();
  }

  @Put('/update-password/:userId')
  async updatePassword(
    @Param('userId') userId: number,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    await this.authService.updatePassword(userId, currentPassword, newPassword);
    return { message: 'Password updated successfully' };
  }
  
}
