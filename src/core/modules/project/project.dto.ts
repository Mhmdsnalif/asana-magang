import { Status } from './project.enum';

export class ProjectDto {
  readonly idProject?: number; // Ubah agar opsional
  readonly projectName: string;
  startDate?: Date;
  endDate?: Date;
  taskDesc?: string;
  status?: Status; // Tambahkan tanda ? untuk opsional
}
