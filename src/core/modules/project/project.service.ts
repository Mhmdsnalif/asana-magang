import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';
import { PROJECT_REPOSITORY, TEAM_REPOSITORY } from 'src/core/constants';
import { Team } from '../team/team.entity';


@Injectable()
export class ProjectService {
    projects: any;
    constructor(
        @Inject(PROJECT_REPOSITORY) private readonly projectRepository: typeof Project,
        @Inject(TEAM_REPOSITORY) private readonly teamRepository: typeof Team

      ){}

      async addProject(idTim: number, projectDto: ProjectDto): Promise<Project> {
        // Cari tim berdasarkan idTim
        const team = await this.teamRepository.findByPk(idTim);
    
        // Jika tim tidak ditemukan, lempar NotFoundException
        if (!team) {
          throw new NotFoundException(`Tim dengan ID ${idTim} tidak ditemukan`);
        }
    
        // Buat proyek baru dengan nilai dari projectDto
        const project = await this.projectRepository.create({
          ...projectDto, // Menggunakan seluruh nilai dari projectDto
          idTim: team.idTim, // Set idTim dengan idTim dari tim yang ditemukan
        });
    
        // Mengambil proyek yang diperbarui (opsional, tergantung pada kebutuhan Anda)
        const updatedTeam = await this.teamRepository.findByPk(idTim);
    
        return project;
    }
    



  async findAll(): Promise<Project[]> {
    // Di sini, Anda juga bisa mengambil data tim yang terkait dengan proyek
    // dengan menggabungkan data dari tabel Project dan Team berdasarkan idTim
    return await this.projectRepository.findAll({
        include: [{all: true}]
    })
  }

  findById(id: number): Project {
    const project = this.projects.find((p) => p.idProject === id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  update(id: number, projectDto: ProjectDto): Project {
    const project = this.findById(id);
    // Di sini, Anda bisa menambahkan logika untuk memperbarui proyek
    // dan kolom idTim sesuai kebutuhan
    return project;
  }

  delete(id: number): void {
    const project = this.findById(id);
    // Di sini, Anda bisa menambahkan logika untuk menghapus proyek
    // sesuai kebutuhan Anda
  }
}
