import { IError, IServiceResponse, IUser, User } from '@shared';

export class UsersService {
  constructor() {}
  async getUser(code: string): Promise<IServiceResponse<IUser>> {
    try {
      const user = await User.findOne({ where: { code } });
      if (!user) {
        const error: IError = {
          message: 'Usuário não encontrado',
          status: 404,
        };
        return { error };
      }
      return { data: user };
    } catch (error) {
      console.log(error);
      const errorResponse: IError = {
        message: 'Falha ao buscar usuário',
        status: 400,
      };
      return { error: errorResponse };
    }
  }
  async createUser(): Promise<IServiceResponse<IUser>> {
    try {
      const code: string = Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join('');
      const user = await User.create({ code } as User);
      if (!user) {
        const error: IError = {
          message: 'Falha ao criar usuário',
          status: 400,
        };
        return { error };
      }
      return { data: user };
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
