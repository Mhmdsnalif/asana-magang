import { Status } from './status.enum';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class TaskDto {
  @IsString()
  name: string;

  @IsOptional()
  startDate?: Date;
  endDate?: Date;
  taskDesc?: string;
  status: Status;
  forUser: string;
  parentId?: number;
}