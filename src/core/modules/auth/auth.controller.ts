import { Controller, Request, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../../modules/users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('/signup')
  async create(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
