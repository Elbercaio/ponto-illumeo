import { User } from '../../../shared';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser = {
    id: 1,
    code: '4SXXFMf',
  } as User;

  beforeEach(() => {
    service = new UsersService();
  });

  describe('getUser', () => {
    it('should return the user', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

      const result = await service.getUser('4SXXFMf');

      expect(result).toEqual({ data: mockUser });
      expect(User.findOne).toHaveBeenCalledWith({ where: { code: '4SXXFMf' } });
    });

    it('should return an error when the user does not exists', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      const result = await service.getUser('4SXXFMg');

      expect(result).toEqual({
        error: {
          message: 'Usuário não encontrado',
          status: 404,
        },
      });
      expect(User.findOne).toHaveBeenCalledWith({ where: { code: '4SXXFMg' } });
    });

    it('should return an error when an exception occurs', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Database error'));

      const result = await service.getUser('4SXXFMg');

      expect(result).toEqual({
        error: {
          message: 'Falha ao buscar usuário',
          status: 400,
        },
      });
      expect(User.findOne).toHaveBeenCalledWith({ where: { code: '4SXXFMg' } });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      jest.spyOn(User, 'create').mockResolvedValueOnce(mockUser);

      const result = await service.createUser();

      expect(User.create).toHaveBeenCalled();
      expect(result.data?.code?.length).toEqual(7);
      expect(typeof result.data?.code).toEqual('string');
    });

    it('should return an error if user creation fails', async () => {
      jest.spyOn(User, 'create').mockRejectedValueOnce(new Error());

      const result = await service.createUser();
      expect(User.create).toHaveBeenCalled();
      expect(result).toEqual({
        error: {
          message: 'Falha ao criar usuário',
          status: 400,
        },
      });
    });
  });
});
