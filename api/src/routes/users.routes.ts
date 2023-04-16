import express, { Router } from 'express';
import { UsersController } from '../modules/users/controllers/users.controller';

const router: Router = express.Router();
const controller = new UsersController();
router.get('/:code', controller.getUser);
router.post('/', controller.postUser);
export default router;
