import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';
import { IUser } from '../../../shared';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let mockReq: Request;
  let mockRes: Response;
  let code: string;

  const mockUser: IUser = { id: 1, code: '4SXXFMf' };

  beforeEach(() => {
    service = new UsersService();
    controller = new UsersController(service);
    mockReq = {} as Request;
    code = '4SXXFMf';
    mockReq.params = { code };
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
  });

  describe('getUser', () => {
    it('should call service with correct user ID', async () => {
      const mockService = jest.spyOn(service, 'getUser').mockResolvedValue({ data: mockUser });
      await controller.getUser(mockReq, mockRes);
      expect(mockService).toHaveBeenCalledWith(code);
    });

    it('should return user record data when service succeeds', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue({ data: mockUser });
      await controller.getUser(mockReq, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return error message when service fails', async () => {
      const error = { status: 400, message: 'Falha ao buscar usuários' };
      jest.spyOn(service, 'getUser').mockResolvedValue({ error });
      await controller.getUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(error.status);
      expect(mockRes.send).toHaveBeenCalledWith(error.message);
    });
  });

  describe('postUser', () => {
    it('should call service with correct user ID', async () => {
      const mockService = jest.spyOn(service, 'createUser').mockResolvedValue({ data: mockUser });
      await controller.postUser(mockReq, mockRes);
      expect(mockService).toHaveBeenCalled();
    });

    it('should return user record data when service succeeds', async () => {
      jest.spyOn(service, 'createUser').mockResolvedValue({ data: mockUser });
      await controller.postUser(mockReq, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return error message when service fails', async () => {
      const error = { status: 400, message: 'Falha ao criar usuários' };
      jest.spyOn(service, 'createUser').mockResolvedValue({ error });
      await controller.postUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(error.status);
      expect(mockRes.send).toHaveBeenCalledWith(error.message);
    });
  });
});
