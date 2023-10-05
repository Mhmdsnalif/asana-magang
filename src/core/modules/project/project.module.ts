import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { projectProviders } from './project.providers';
import { teamsProviders } from '../team/team.providers';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { userProviders } from '../users/users.providers';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ...projectProviders, ...teamsProviders, 
    //Add Roles//
    JwtService, UsersService, ...userProviders, AuthService, MailService],
})
export class ProjectModule {}
