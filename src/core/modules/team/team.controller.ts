import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { Team as TeamEntity } from './team.entity';
import { Member as MemberEntity } from '../member/member.entity';
import { AuthGuard } from '@nestjs/passport';
import { TeamDto } from './team.dto';
import { MemberDTO } from '../member/member.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll() {
    // Dapatkan semua tim dalam database
    return await this.teamService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  async findall() {
    return await this.teamService.findall();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() team: TeamDto, @Request() req): Promise<TeamEntity> {
    // Buat tim baru dan kembalikan tim yang baru dibuat
    return await this.teamService.create(team, req.user.nip);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':idTim/add-member')
  async addMemberToTeam(
    @Param('idTim') idTim: number,
    @Body() memberDTO: MemberDTO,
  ): Promise<MemberEntity> {
    try {
      const updatedTeam = await this.teamService.addMember(
        idTim,
        memberDTO.memberId,
      );
      return updatedTeam;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
