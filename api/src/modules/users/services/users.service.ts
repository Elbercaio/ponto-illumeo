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
      const errorResponse: IError = {
        message: `Falha ao buscar usuário\n${error}`,
        status: 400,
      };
      return { error: errorResponse };
    }
  }
  async createUser(): Promise<IServiceResponse<IUser>> {
    try {
      const code: string = Array.from(Array(7), () => Math.floor(Math.random() * 36).toString(36)).join('');
      return { data: await User.create({ code } as User) };
    } catch (error) {
      const errorResponse: IError = {
        message: `Falha ao criar usuário\n${error}`,
        status: 400,
      };
      return { error: errorResponse };
    }
  }
}
