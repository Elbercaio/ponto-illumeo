import { Model, Column, Table, DataType, CreatedAt } from 'sequelize-typescript';
import { IUserRecord } from '../interfaces/user-record.interface';

export enum UserRecordType {
  start = 'start',
  end = 'end',
}

@Table({
  modelName: 'user_records',
  timestamps: false,
})
export class UserRecord extends Model<UserRecord> implements IUserRecord {
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
  recordType!: UserRecordType;

  @CreatedAt
  timestamp!: Date;
}
