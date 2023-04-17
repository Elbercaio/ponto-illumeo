import { AxiosResponse } from 'axios';
import { IDayTime, IUserRecord, http } from '../../../shared';

export class UserRecordService {
  getDailyUserRecord(code: string): Promise<AxiosResponse<IDayTime>> {
    return http.get<IDayTime>(`@senaiplay-api/records/${code}`);
  }

  postUserRecord(): Promise<AxiosResponse<IUserRecord>> {
    return http.post<IUserRecord>('@senaiplay-api/records');
  }
}
