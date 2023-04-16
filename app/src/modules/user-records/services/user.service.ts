import { IUser, http } from "../../../shared";
import { AxiosResponse } from "axios";

export class UserService {
  get(code: string): Promise<AxiosResponse<IUser>> {
    return http.get<IUser>(`@senaiplay-api/users/${code}`);
  }

  create(): Promise<AxiosResponse<IUser>> {
    return http.post<IUser>("@senaiplay-api/users");
  }
}
