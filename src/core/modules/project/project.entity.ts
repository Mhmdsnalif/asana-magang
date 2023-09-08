import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/User.entity';

@Table
export class Project extends Model<Project> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  idProject: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  namaProject: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  deskripsi: string;

  @Column({
    type: DataType.ENUM,
    values: ['OnTrack', 'AtRisk', 'OffTrack', 'OnHold', 'Complete'],
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dueDate: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  nip: number;

  @BelongsTo(() => User)
  user: User;
}
