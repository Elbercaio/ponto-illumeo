import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { IUserRegistry } from '../interfaces/user-registry.interface';

export enum UserRegistryType {
  start = 'start',
  end = 'end',
}

@Table({
  modelName: 'user_registry',
  timestamps: true,
})
export class UserRegistry extends Model<UserRegistry> implements IUserRegistry {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id?: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.ENUM('start', 'end'),
    allowNull: false,
  })
  registryType!: UserRegistryType;
}
