import { AxiosResponse } from "axios";
import { IUserRecord, http } from "../../../shared";

type DiffByDay = {
  [key: string]: number;
};
export class UserRecordService {
  getDailyUserRecord(code: string): Promise<AxiosResponse<DiffByDay>> {
    return http.get<DiffByDay>(`@senaiplay-api/records/${code}`);
  }

  postUserRecord(): Promise<AxiosResponse<IUserRecord>> {
    return http.post<IUserRecord>("@senaiplay-api/records");
  }
}
