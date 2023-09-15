import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { projectProviders } from './project.providers';
import { teamsProviders } from '../team/team.providers';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ...projectProviders, ...teamsProviders]
})
export class ProjectModule {}
