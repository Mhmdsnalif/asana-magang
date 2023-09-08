import {
  Controller,
  Request,
  Body,
  Post,
  UseGuards,
  Get,
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
    return await this.authService.login(req.user);
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
}
