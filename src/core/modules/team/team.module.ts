import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { teamsProviders } from './team.providers';
import { memberProviders } from '../member/member.providers';

@Module({
  controllers: [TeamController],
  providers: [TeamService, ...teamsProviders, ...memberProviders],
})
export class TeamModule {}
