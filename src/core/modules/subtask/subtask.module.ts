import { Module } from '@nestjs/common';
import { SubTask } from './subtask.entity';
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { subtaskProviders } from './subtask.providers';
import { taskProviders } from '../task/task.providers';


@Module({
  providers: [SubTask, SubtaskService, ...subtaskProviders, ...taskProviders],
  controllers: [SubtaskController]
})
export class SubtaskModule {}
