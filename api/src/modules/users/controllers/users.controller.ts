import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';

export class UsersController {
  constructor(private service = new UsersService()) {}
  getUser = async (req: Request, res: Response) => {
    const user = await this.service.getUser(req?.params.code);
    if (!user?.message) {
      res.json(user);
    } else {
      res.status(Number(user.status)).send(user.message);
    }
  };

  postUser = async (_req: Request, res: Response) => {
    const user = await this.service.createUser();
    if (!user?.message) {
      res.json(user);
    } else {
      res.status(Number(user.status)).send(user.message);
    }
  };
}
