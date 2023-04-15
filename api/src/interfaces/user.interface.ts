import { IUserRegistry } from './user-registry.interface';

export interface IUser {
  id?: number;
  code?: string;
  userRegistry?: IUserRegistry[];
}
