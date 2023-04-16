import { IUserRecord } from './user-record.interface';

export interface IUser {
  id?: number;
  code?: string;
  userRecord?: IUserRecord[];
}
