import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() taskDto: TaskDto): Promise<Task> {
    return await this.taskService.create(taskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Task> {
    return await this.taskService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() taskDto: TaskDto): Promise<Task> {
    return await this.taskService.update(id, taskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.taskService.delete(id);
  }
}
