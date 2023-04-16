import { IError } from '../../../interfaces/error.interface';
import { IUser } from '../../../interfaces/user.interface';
import { UserRecord } from '../../../models/user-record.model';
import { User } from '../../../models/user.model';

interface IUserResponse extends Partial<IUser>, Partial<IError> {}

export class UsersService {
  constructor() {}
  async getUser(code: string): Promise<IUserResponse> {
    try {
      const user = await User.findOne({ where: { code } });
      if (!user) {
        return {
          message: 'Usuário não encontrado',
          status: 404,
        };
      }
      return user;
    } catch (error) {
      console.log(error);
      return {
        message: 'Falha ao buscar usuário',
        status: 400,
      };
    }
  }
  async createUser(): Promise<IUserResponse> {
    try {
      const code = Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join('');
      const user = await User.create({ code } as User);
      if (!user) {
        return {
          message: 'Falha ao criar usuário',
          status: 404,
        };
      }
      return user;
    } catch (error) {
      console.log(error);
      return {
        message: 'Falha ao criar usuário',
        status: 400,
      };
    }
  }
}
