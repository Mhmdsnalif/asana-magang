import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/Database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './core/modules/auth/auth.module';
import { UsersModule } from './core/modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
