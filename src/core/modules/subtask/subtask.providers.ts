import { SUBTASK_REPOSITORY } from 'src/core/constants';
import { SubTask } from './subtask.entity';

export const subtaskProviders = [
  {
    provide: SUBTASK_REPOSITORY,
    useValue: SubTask,
  },
];
