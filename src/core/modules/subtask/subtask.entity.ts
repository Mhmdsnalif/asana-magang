import {
    Table,
    Column,
    Model,
    ForeignKey,
    BelongsTo,
    DataType,
  } from 'sequelize-typescript';
  import { Task } from '../Task/Task.entity';
  import { User } from '../users/user.entity';
  import { Status } from './status.enum';
  
  @Table
  export class SubTask extends Model<SubTask> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    })
    id: number;
  
    @ForeignKey(() => Task)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    taskId: number;
  
    @BelongsTo(() => Task)
    Task: Task;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    taskName: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    forUser: number;
  
    @Column({
      type: DataType.DATE,
      allowNull: true,
    })
    startDate: Date;
    
    @Column({
      type: DataType.DATE,
      allowNull: true,
    })
    endDate: Date;
    
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    taskDesc: string;
  
    @Column({
        type: DataType.ENUM('Pending', 'InProgress', 'Completed'),
      allowNull: false,
      defaultValue: 'Pending',
    })
    status: Status;
  
    // Kolom-kolom tambahan seperti peran atau tanggal bergabung
  }
  