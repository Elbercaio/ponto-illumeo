import { UserRegistryType } from '../models/user-registry.model';
import { IUser } from './user.interface';

export interface IUserRegistry {
  id?: number;
  userId: number;
  registryType: UserRegistryType;
  user?: IUser;
  createdAt?: Date;
}
