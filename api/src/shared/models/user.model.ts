import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { IUser } from '../interfaces/user.interface';
import { UserRecord } from './user-record.model';

@Table({
  modelName: 'user',
  timestamps: false,
})
export class User extends Model<User> implements IUser {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code!: string;

  @HasMany(() => UserRecord, 'userId')
  userRecord?: UserRecord[];
}