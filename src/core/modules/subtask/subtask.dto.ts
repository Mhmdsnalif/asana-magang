import { Status } from './status.enum';

export class subtaskDto {
  readonly subtaskId: number;
  readonly subtaskName: string;
  forUser?: number;
  startDate?: Date;
  endDate?: Date;
  taskDesc?: string;
  status: Status;
}
