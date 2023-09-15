import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { subtaskDto } from './subtask.dto';
import { SubTask } from './subtask.entity';
import { TaskDto } from '../task/task.dto';

@Controller('subtask')
export class SubtaskController {
    constructor(private readonly subtaskService: SubtaskService) {}

    @Post(':idTask/subtask')
  async addSubtask(
    @Param('idTask') idTask: number,
    @Body() subtaskDto: subtaskDto
  ): Promise<SubTask> {
    return this.subtaskService.addSubTask(idTask, subtaskDto);
  }

  @Get()
  async findAll(): Promise<SubTask[]> {
    return await this.subtaskService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<SubTask> {
    return await this.subtaskService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() taskDto: subtaskDto): Promise<SubTask> {
    return await this.subtaskService.update(id, taskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.subtaskService.delete(id);
  }
}
