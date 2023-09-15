import { Status } from './status.enum';

export class TaskDto {
  readonly idTask: number;
  readonly taskName: string;
  forMember?: number;
  startDate?: Date;
  endDate?: Date;
  taskDesc?: string;
  status: Status;
}
