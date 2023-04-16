import { Request, Response } from 'express';
import { UserRecordsService } from '../services/user-records.service';
import { UserRecordsController } from './user-records.controller';
import { IUserRecord, UserRecordType } from '@shared';

describe('UserRecordsController', () => {
  let controller: UserRecordsController;
  let service: UserRecordsService;
  let mockReq: Request;
  let mockRes: Response;
  let userCode: string;
  let body: IUserRecord;

  const mockUserRecords = [
    { id: 1, userCode: '4SXXFMf', recordType: UserRecordType.start, timestamp: new Date('2021-01-01T08:00:00.000Z') },
    { id: 2, userCode: '4SXXFMf', recordType: UserRecordType.end, timestamp: new Date('2021-01-01T12:00:00.000Z') },
  ];

  const mockDailyUserRecord = {
    '2023-04-14': 8.000833333333333,
    '2023-04-15': 13.986775833333333,
  };
  beforeEach(() => {
    service = new UserRecordsService();
    controller = new UserRecordsController(service);
    mockReq = {} as Request;
    userCode = '1';
    mockReq.params = { userCode };
    body = {
      userCode: '4SXXFMf1',
      recordType: UserRecordType.start,
      timestamp: new Date('2021-01-01T08:00:00.000Z'),
    };
    mockReq.body = body;
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
  });

  describe('getUserRecord', () => {
    it('should call service with correct user ID', async () => {
      const mockService = jest.spyOn(service, 'getRecordsByUser').mockResolvedValue({ data: mockUserRecords });
      await controller.getUserRecord(mockReq, mockRes);
      expect(mockService).toHaveBeenCalledWith(+userCode);
    });

    it('should return user record data when service succeeds', async () => {
      jest.spyOn(service, 'getRecordsByUser').mockResolvedValue({ data: mockUserRecords });
      await controller.getUserRecord(mockReq, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith(mockUserRecords);
    });

    it('should return error message when service fails', async () => {
      const error = { status: 400, message: 'Falha ao buscar registros' };
      jest.spyOn(service, 'getRecordsByUser').mockResolvedValue({ error });
      await controller.getUserRecord(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(error.status);
      expect(mockRes.send).toHaveBeenCalledWith(error.message);
    });
  });

  describe('getDailyUserRecord', () => {
    it('should call service with correct user ID', async () => {
      const mockService = jest.spyOn(service, 'getDailyRecordsByUser').mockResolvedValue({ data: mockDailyUserRecord });
      await controller.getDailyUserRecord(mockReq, mockRes);
      expect(mockService).toHaveBeenCalledWith(+userCode);
    });

    it('should return daily user record data when service succeeds', async () => {
      jest.spyOn(service, 'getDailyRecordsByUser').mockResolvedValue({ data: mockDailyUserRecord });
      await controller.getDailyUserRecord(mockReq, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith(mockDailyUserRecord);
    });

    it('should return error message when service fails', async () => {
      const error = { status: 400, message: 'Falha ao buscar registros' };
      jest.spyOn(service, 'getDailyRecordsByUser').mockResolvedValue({ error });
      await controller.getDailyUserRecord(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(error.status);
      expect(mockRes.send).toHaveBeenCalledWith(error.message);
    });
  });

  describe('postUserRecord', () => {
    it('should call service with correct user ID', async () => {
      const mockService = jest.spyOn(service, 'createUserRecord').mockResolvedValue({ data: mockUserRecords[0] });
      await controller.postUserRecord(mockReq, mockRes);
      expect(mockService).toHaveBeenCalledWith(body);
    });

    it('should return user record data when service succeeds', async () => {
      jest.spyOn(service, 'createUserRecord').mockResolvedValue({ data: mockUserRecords[0] });
      await controller.postUserRecord(mockReq, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith(mockUserRecords[0]);
    });

    it('should return error message when service fails', async () => {
      const error = { status: 400, message: 'Falha ao criar registros' };
      jest.spyOn(service, 'createUserRecord').mockResolvedValue({ error });
      await controller.postUserRecord(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(error.status);
      expect(mockRes.send).toHaveBeenCalledWith(error.message);
    });
  });
});
