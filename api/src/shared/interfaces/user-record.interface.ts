import { UserRecordType } from '../enums';
import { IUser } from './user.interface';

export interface IUserRecord {
  id?: number;
  userId: number;
  recordType: UserRecordType;
  user?: IUser;
  timestamp?: Date;
}
