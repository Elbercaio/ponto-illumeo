import { AxiosResponse } from 'axios';
import { IUser, environment, http } from '../../../shared';

export class UserService {
  get(code: string): Promise<AxiosResponse<IUser>> {
    return http.get<IUser>(`${environment.apiURI}users/${code}`);
  }

  create(): Promise<AxiosResponse<IUser>> {
    return http.post<IUser>(`${environment.apiURI}users`);
  }
}
