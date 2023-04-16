import { Request, Response } from 'express';
import { UserRecordsService } from '../services/user-records.service';

export class UserRecordsController {
  constructor(private service = new UserRecordsService()) {}
  getUserRecord = async (req: Request, res: Response) => {
    const record = await this.service.getRecordsByUser(Number(req?.params.userId));
    if (record?.data) {
      res.json(record.data);
    } else {
      res.status(Number(record.error?.status)).send(record.error?.message);
    }
  };

  getDailyUserRecord = async (req: Request, res: Response) => {
    const record = await this.service.getDailyRecordsByUser(Number(req?.params.userId));
    if (record?.data) {
      res.json(record.data);
    } else {
      res.status(Number(record.error?.status)).send(record.error?.message);
    }
  };

  postUserRecord = async (req: Request, res: Response) => {
    const record = await this.service.createUserRecord(req.body);
    if (record?.data) {
      res.json(record.data);
    } else {
      res.status(Number(record.error?.status)).send(record.error?.message);
    }
  };
}
