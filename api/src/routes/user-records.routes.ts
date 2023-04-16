import express, { Router } from 'express';
import { UserRecordsController } from '../modules/user-records/controllers/user-records.controller';

const router: Router = express.Router();
const controller = new UserRecordsController();
router.get('/:userCode', controller.getUserRecord);
router.get('/daily/:userCode', controller.getDailyUserRecord);
router.post('/', controller.postUserRecord);
export default router;
