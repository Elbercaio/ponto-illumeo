import { IError } from './error.interface';

export interface IServiceResponse<T> {
  data?: T;
  error?: IError;
}
