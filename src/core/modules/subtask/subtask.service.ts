import { Inject, Injectable,NotFoundException } from '@nestjs/common';
import { SubTask } from './subtask.entity';
import { SUBTASK_REPOSITORY, TASK_REPOSITORY } from 'src/core/constants';
import { subtaskDto } from './subtask.dto';
import { Task } from '../task/task.entity';

@Injectable()
export class SubtaskService {
    constructor(
        @Inject(SUBTASK_REPOSITORY) private readonly subtaskRepository: typeof SubTask,
        @Inject(TASK_REPOSITORY) private readonly taskRepository: typeof Task
      ) {}
    
      async addSubTask(idTask: number, subtaskDto: subtaskDto): Promise<SubTask> {
        // Cari tugas (task) berdasarkan idTask
        const task = await this.taskRepository.findByPk(idTask);
    
        // Jika tugas (task) tidak ditemukan, lempar NotFoundException
        if (!task) {
          throw new NotFoundException(`Tugas dengan ID ${idTask} tidak ditemukan`);
        }
    
        // Buat sub-tugas baru dengan nilai dari subtaskDto
        const subtask = await this.subtaskRepository.create({
          ...subtaskDto, // Menggunakan seluruh nilai dari subtaskDto
          taskId: task.id, // Set taskId dengan idTask dari tugas yang ditemukan
        });
    
        // Mengembalikan sub-tugas yang baru dibuat
        return subtask;
      }
    
      async findAll(): Promise<SubTask[]> {
        return await this.subtaskRepository.findAll<SubTask>();
      }
    
      async findById(id: number): Promise<SubTask> {
        const task = await this.subtaskRepository.findByPk(id);
    
        if (!task) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
    
        return task;
      }
    
      async update(id: number, subtaskDto: subtaskDto): Promise<SubTask> {
        const subtask = await this.findById(id);
    
        // Di sini, Anda bisa menambahkan logika validasi data jika diperlukan
        // Sebelum melakukan pembaruan pada entitas Task.
        return await subtask.update(subtaskDto);
      }
    
      async delete(id: number): Promise<void> {
        const subtask = await this.findById(id);
    
        await subtask.destroy();
      }
}
