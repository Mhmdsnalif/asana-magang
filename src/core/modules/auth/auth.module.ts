import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
