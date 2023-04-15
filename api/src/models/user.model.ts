import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { IUser } from '../interfaces/user.interface';
import { UserRegistry } from './user-registry.model';

@Table({
  modelName: 'user',
})
export class User extends Model<User> implements IUser {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code!: string;

  @HasMany(() => UserRegistry, 'userId')
  userRegistry?: UserRegistry[];
}
