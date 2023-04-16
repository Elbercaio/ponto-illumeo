import express, { Router } from 'express';
import { UserRecordsController } from '../modules/user-records/controllers/user-records.controller';

const router: Router = express.Router();
const controller = new UserRecordsController();
router.get('/:userId', controller.getUserRecord);
router.post('/', controller.postUserRecord);
export default router;
