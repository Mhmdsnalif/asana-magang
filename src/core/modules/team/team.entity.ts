import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/User.entity";

@Table
export class Team extends Model<Team> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  idTim: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  namaTim: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  

}
