import { AxiosResponse } from 'axios';
import { IDayTime, IUserRecord, environment, http } from '../../../shared';

export class UserRecordService {
  getDailyUserRecord(code: string): Promise<AxiosResponse<IDayTime[]>> {
    return http.get<IDayTime[]>(`${environment.apiURI}records/daily/${code}`);
  }

  postUserRecord(body: IUserRecord): Promise<AxiosResponse<IUserRecord>> {
    return http.post<IUserRecord>(`${environment.apiURI}records/`, body);
  }
}
