import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './project.dto';
import { Project as ProjectEntity } from './project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post(':idTim/projects')
  async addProjectToTeam(
    @Param('idTim') idTim: number,
    @Body() projectDto: ProjectDto,
  ): Promise<ProjectEntity> {
    try {
      const addedProject = await this.projectService.addProject(idTim, projectDto);
      return addedProject;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<ProjectEntity[]> {
    // Di sini, pastikan Anda mengambil data tim yang terkait dengan proyek
    return await this.projectService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ProjectEntity> {
    return await this.projectService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() projectDto: ProjectDto,
  ): Promise<ProjectEntity> {
    // Di sini, pastikan Anda mengirimkan objek projectDto yang sesuai dengan perubahan Anda
    return await this.projectService.update(id, projectDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    // Di sini, pastikan Anda menghapus proyek sesuai kebutuhan Anda
    await this.projectService.delete(id);
  }
}
