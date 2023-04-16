import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { UserRecordType } from '../enums';
import { IUserRecord } from '../interfaces';

@Table({
  modelName: 'user_records',
  timestamps: false,
})
export class UserRecord extends Model<UserRecord> implements IUserRecord {
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
  userCode!: string;

  @Column({
    type: DataType.ENUM('start', 'end'),
    allowNull: false,
  })
  recordType!: UserRecordType;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  timestamp!: Date;
}
