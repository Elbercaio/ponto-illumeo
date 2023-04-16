import { IError, IServiceResponse, IUserRecord, UserRecord } from '@shared';
import { CreateUserRecordDto } from '../dtos/create-user-record.dto';

export class UserRecordsService {
  constructor() {}
  async getRecordsByUser(userId: number): Promise<IServiceResponse<IUserRecord[]>> {
    try {
      const records = await UserRecord.findAll({ where: { userId } });
      if (!records) {
        const error: IError = {
          message: 'Registros do usuário não encontrados',
          status: 404,
        };
        return { error };
      }
      return { data: records };
    } catch (error) {
      console.log(error);
      const errorResponse: IError = {
        message: 'Falha ao buscar registros do usuário',
        status: 400,
      };
      return { error: errorResponse };
    }
  }

  async getDailyRecordsByUser(userId: number): Promise<IServiceResponse<IUserRecord[]>> {
    try {
      const records = await UserRecord.findAll({ where: { userId } });

      if (!records) {
        const error: IError = {
          message: 'Registros do usuário não encontrados',
          status: 404,
        };
        return { error };
      }
      return { data: records };
    } catch (error) {
      console.log(error);
      const errorResponse: IError = {
        message: 'Falha ao buscar registros do usuário',
        status: 400,
      };
      return { error: errorResponse };
    }
  }

  async createUserRecord(createDto: CreateUserRecordDto): Promise<IServiceResponse<IUserRecord>> {
    try {
      const lastRecord = await UserRecord.findOne({
        where: { userId: createDto.userId },
        order: [['timestamp', 'DESC']],
      });
      if (lastRecord && lastRecord?.recordType === createDto?.recordType) {
        const error: IError = {
          message:
            lastRecord?.recordType === 'start'
              ? 'É preciso finalizar o turno primeiro'
              : 'É preciso começar o turno primeiro',
          status: 409,
        };
        return { error };
      }
      const record = await UserRecord.create(createDto as UserRecord);
      if (!record) {
        const error: IError = {
          message: 'Falha ao criar registro',
          status: 400,
        };
        return { error };
      }
      return { data: record };
    } catch (error) {
      console.log(error);
      const errorResponse: IError = {
        message: 'Falha ao criar usuário',
        status: 400,
      };
      return { error: errorResponse };
    }
  }
}
