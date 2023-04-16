import express, { Router, Request, Response } from 'express';
import { UsersController } from '../modules/users/controllers/users.controller';

const router: Router = express.Router();
const controller = new UsersController();
router.get('/:code', controller.getUser);
router.post('/', controller.postUser);
export default router;

// // GET a single user by code
// router.get('/users/:code', async (req: Request, res: Response) => {
//   try {
//     const user = await User.findOne({ where: { code: req.params.code } });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).send('Usuário não encontrado');
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // CREATE a new user
// router.post('/users', async (_req: Request, res: Response) => {
//   try {
//     const code = Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join('');
//     const user = await User.create({ code } as User);
//     if (user) {
//       res.status(201).json(`Acesse seu ponto com o código ${user.code}}`);
//     } else {
//       res.status(404).send('Falha ao criar usuário');
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// export default router;
