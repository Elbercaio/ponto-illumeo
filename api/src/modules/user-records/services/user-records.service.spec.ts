import { UserRecord, UserRecordType } from '@shared';
import { CreateUserRecordDto } from '../dtos/create-user-record.dto';
import { UserRecordsService } from './user-records.service';

describe('UserRecordsService', () => {
  let service: UserRecordsService;

  const mockUserRecords = [
    {
      id: 1,
      userId: 1,
      recordType: UserRecordType.start,
      timestamp: new Date('2023-04-14T08:00:00.000Z'),
    } as UserRecord,
    { id: 2, userId: 1, recordType: UserRecordType.end, timestamp: new Date('2023-04-14T12:00:00.000Z') } as UserRecord,
    {
      id: 3,
      userId: 1,
      recordType: UserRecordType.start,
      timestamp: new Date('2023-04-15T08:00:00.000Z'),
    } as UserRecord,
    { id: 4, userId: 1, recordType: UserRecordType.end, timestamp: new Date('2023-04-15T12:00:00.000Z') } as UserRecord,
  ];

  const createDto: CreateUserRecordDto = {
    userId: 1,
    recordType: UserRecordType.start,
    timestamp: new Date('2023-04-14T12:00:00.000Z'),
  };

  beforeEach(() => {
    service = new UserRecordsService();
  });

  describe('getRecordsByUser', () => {
    it('should return the user records when the user have records', async () => {
      jest.spyOn(UserRecord, 'findAll').mockResolvedValue(mockUserRecords);

      const result = await service.getRecordsByUser(1);

      expect(result).toEqual({ data: mockUserRecords });
      expect(UserRecord.findAll).toHaveBeenCalledWith({ where: { userId: 1 } });
    });

    it('should return an error when the user does not have records', async () => {
      jest.spyOn(UserRecord, 'findAll').mockResolvedValue([]);

      const result = await service.getRecordsByUser(1);

      expect(result).toEqual({
        error: {
          message: 'Registros do usuário não encontrados',
          status: 404,
        },
      });
      expect(UserRecord.findAll).toHaveBeenCalledWith({ where: { userId: 1 } });
    });

    it('should return an error when an exception occurs', async () => {
      jest.spyOn(UserRecord, 'findAll').mockRejectedValue(new Error('Database error'));

      const result = await service.getRecordsByUser(1);

      expect(result).toEqual({
        error: {
          message: 'Falha ao buscar registros do usuário',
          status: 400,
        },
      });
      expect(UserRecord.findAll).toHaveBeenCalledWith({ where: { userId: 1 } });
    });
  });

  describe('getDailyRecordsByUser', () => {
    it('should return the daily user records when the user have records', async () => {
      jest.spyOn(UserRecord, 'findAll').mockResolvedValue(mockUserRecords);

      const result = await service.getDailyRecordsByUser(1);

      expect(result).toEqual({
        data: {
          '2023-04-14': 4,
          '2023-04-15': 4,
        },
      });
      expect(UserRecord.findAll).toHaveBeenCalledWith({ where: { userId: 1 }, order: [['timestamp', 'ASC']] });
    });

    it('should return even if the turn has not finished', async () => {
      jest.spyOn(UserRecord, 'findAll').mockResolvedValue([mockUserRecords[0]]);

      const result = await service.getDailyRecordsByUser(1);
      if (result?.data) {
        expect(result.data['2023-04-14']).toBeGreaterThan(0);
      }
      expect(UserRecord.findAll).toHaveBeenCalledWith({ where: { userId: 1 }, order: [['timestamp', 'ASC']] });
    });

    it('should return an error when the user does not have records', async () => {
      jest.spyOn(UserRecord, 'findAll').mockResolvedValue([]);

      const result = await service.getDailyRecordsByUser(1);

      expect(result).toEqual({
        error: {
          message: 'Registros do usuário não encontrados',
          status: 404,
        },
      });
      expect(UserRecord.findAll).toHaveBeenCalledWith({ where: { userId: 1 }, order: [['timestamp', 'ASC']] });
    });

    it('should return an error when an exception occurs', async () => {
      jest.spyOn(UserRecord, 'findAll').mockRejectedValue(new Error('Database error'));

      const result = await service.getDailyRecordsByUser(1);

      expect(result).toEqual({
        error: {
          message: 'Falha ao buscar registros do usuário',
          status: 400,
        },
      });
      expect(UserRecord.findAll).toHaveBeenCalledWith({ where: { userId: 1 }, order: [['timestamp', 'ASC']] });
    });
  });

  describe('createUserRecord', () => {
    it('should create a new user record if no previous record exists', async () => {
      jest.spyOn(UserRecord, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(UserRecord, 'create').mockResolvedValueOnce(mockUserRecords[0]);

      const result = await service.createUserRecord(createDto);

      expect(UserRecord.findOne).toHaveBeenCalledWith({
        where: { userId: createDto.userId },
        order: [['timestamp', 'DESC']],
      });
      expect(UserRecord.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({ data: mockUserRecords[0] });
    });

    it('should create a new user record if previous record has different type', async () => {
      jest.spyOn(UserRecord, 'create').mockResolvedValueOnce(mockUserRecords[0]);
      jest.spyOn(UserRecord, 'findOne').mockResolvedValueOnce(mockUserRecords[3]);

      const result = await service.createUserRecord(createDto);

      expect(UserRecord.findOne).toHaveBeenCalledWith({
        where: { userId: createDto.userId },
        order: [['timestamp', 'DESC']],
      });
      expect(UserRecord.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({ data: mockUserRecords[0] });
    });

    it('should return an error if previous record has same type', async () => {
      jest.spyOn(UserRecord, 'findOne').mockResolvedValueOnce(mockUserRecords[2]);

      const result = await service.createUserRecord(createDto);

      expect(UserRecord.findOne).toHaveBeenCalledWith({
        where: { userId: createDto.userId },
        order: [['timestamp', 'DESC']],
      });
      expect(UserRecord.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        error: {
          message: 'É preciso finalizar o turno primeiro',
          status: 409,
        },
      });
    });

    it('should return an error if record creation fails', async () => {
      jest.spyOn(UserRecord, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(UserRecord, 'create').mockRejectedValueOnce(new Error());

      const result = await service.createUserRecord(createDto);

      expect(UserRecord.findOne).toHaveBeenCalledWith({
        where: { userId: createDto.userId },
        order: [['timestamp', 'DESC']],
      });
      expect(UserRecord.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({
        error: {
          message: 'Falha ao criar registro',
          status: 400,
        },
      });
    });

    it('should return an error if any error occurs', async () => {
      jest.spyOn(UserRecord, 'findOne').mockRejectedValueOnce(new Error());

      const result = await service.createUserRecord(createDto);

      expect(UserRecord.findOne).toHaveBeenCalledWith({
        where: { userId: createDto.userId },
        order: [['timestamp', 'DESC']],
      });
      expect(UserRecord.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        error: {
          message: 'Falha ao criar registro',
          status: 400,
        },
      });
    });
  });
});
