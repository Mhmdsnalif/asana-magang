import { Inject, Injectable, NotFoundException, Logger} from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/core/constants';
import { Task } from './task.entity';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: typeof Task,
  ) {}

  async create(taskDto: TaskDto): Promise<Task> {
    // Di sini, Anda bisa menambahkan logika validasi data jika diperlukan
    // Sebelum membuat entitas Task.
    return await this.taskRepository.create<Task>(taskDto);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll<Task>({
      include: [{ all: true }],
    });
  }

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findByPk(id, {
      include: [{ all: true }], // Mengambil semua data terkait
    });
  
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  
    return task;
  }  

  async update(id: number, taskDto: TaskDto): Promise<Task> {
    const task = await this.findById(id);

    // Di sini, Anda bisa menambahkan logika validasi data jika diperlukan
    // Sebelum melakukan pembaruan pada entitas Task.
    return await task.update(taskDto);
  }

  async delete(id: number): Promise<void> {
    const task = await this.findById(id);

    await task.destroy();

    // Setelah tugas dihapus, log pesan informasi.
    this.logger.log(`Tugas dengan ID ${id} telah dihapus.`);
  }
}
