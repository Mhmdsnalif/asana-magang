import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Team } from '../team/team.entity';
import { Member } from '../member/member.entity';
import { Status } from './status.enum';

@Table
export class Task extends Model<Task> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Team)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  teamId: number;

  @BelongsTo(() => Team)
  team: Team;

  @ForeignKey(() => Member)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  memberId: number;

  @BelongsTo(() => Member)
  member: Member;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  taskName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  forMember: number;

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
