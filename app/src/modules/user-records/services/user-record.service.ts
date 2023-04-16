import { AxiosResponse } from "axios";
import { IUserRecord, http } from "../../../shared";

export class UserRecordService {
  getDailyUserRecord(code: string): Promise<AxiosResponse<IUserRecord>> {
    return http.get<IUserRecord>(`@senaiplay-api/records/${code}`);
  }

  postUserRecord(): Promise<AxiosResponse<IUserRecord>> {
    return http.post<IUserRecord>("@senaiplay-api/records");
  }
}
