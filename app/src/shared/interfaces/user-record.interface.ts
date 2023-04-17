import { UserRecordType } from '../enums';
import { IUser } from './user.interface';

export interface IUserRecord {
  id?: number;
  userCode: string;
  recordType: UserRecordType;
  timestamp?: Date;
  user?: IUser;
}
