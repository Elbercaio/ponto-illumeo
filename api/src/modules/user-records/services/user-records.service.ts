import { IError, IServiceResponse, IUserRecord, UserRecord } from '@shared';
import { CreateUserRecordDto } from '../dtos/create-user-record.dto';

type DiffByDay = {
  [key: string]: number;
};
export class UserRecordsService {
  constructor() {}
  async getRecordsByUser(userId: number): Promise<IServiceResponse<IUserRecord[]>> {
    try {
      const records = await UserRecord.findAll({ where: { userId } });
      if (!records.length) {
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

  async getDailyRecordsByUser(userId: number): Promise<IServiceResponse<DiffByDay>> {
    try {
      const records = await UserRecord.findAll({ where: { userId }, order: [['timestamp', 'ASC']] });

      if (!records.length) {
        const error: IError = {
          message: 'Registros do usuário não encontrados',
          status: 404,
        };
        return { error };
      }
      const timestamps = records.map((record): Date => record.timestamp);
      if (timestamps.length % 2 !== 0) {
        timestamps.push(new Date(new Date().getTime() - 3 * 60 * 60 * 1000));
      }

      const pairsArray: Date[][] = Array.from({ length: Math.ceil(timestamps.length / 2) }, (_, i) =>
        timestamps.slice(i * 2, i * 2 + 2)
      );

      const diffArray = pairsArray.map((pair) => {
        const [date1, date2] = pair;
        const diffInMs = date2.getTime() - date1.getTime();
        return { day: date1.toISOString().slice(0, 10), difference: diffInMs / (1000 * 60 * 60) };
      });

      const diffByDay: DiffByDay = diffArray.reduce((accumulator: DiffByDay, currentValue) => {
        const { day, difference }: { day: string; difference: number } = currentValue;
        if (day in accumulator) {
          accumulator[day] += difference;
        } else {
          accumulator[day] = difference;
        }
        return accumulator;
      }, {});

      return { data: diffByDay };
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
      return { data: await UserRecord.create(createDto as UserRecord) };
    } catch (error) {
      console.log(error);
      const errorResponse: IError = {
        message: 'Falha ao criar registro',
        status: 400,
      };
      return { error: errorResponse };
    }
  }
}
