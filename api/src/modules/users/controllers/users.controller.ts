import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';

export class UsersController {
  constructor(private service = new UsersService()) {}
  getUser = async (req: Request, res: Response) => {
    const user = await this.service.getUser(req?.params.code);
    if (user?.data) {
      res.json(user.data);
    } else {
      res.status(Number(user.error?.status)).send(user.error?.message);
    }
  };

  postUser = async (_req: Request, res: Response) => {
    const user = await this.service.createUser();
    if (user?.data) {
      res.json(user.data);
    } else {
      res.status(Number(user.error?.status)).send(user.error?.message);
    }
  };
}
