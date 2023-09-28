import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { UserRole } from './user.dto';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    primaryKey: true
  })
  nip: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nohp: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(UserRole),
    defaultValue: UserRole.USER,
  })
  role : UserRole;
}
