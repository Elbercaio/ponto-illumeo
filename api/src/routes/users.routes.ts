import express, { Router, Request, Response } from 'express';
import { User } from '../models/user.model';

const router: Router = express.Router();

// GET a single user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// CREATE a new user
router.post('/users', async (_req: Request, res: Response) => {
  const code = Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join('');
  const user = await User.create({ code } as User);
  if (user) {
    res.status(201).json(`Acesse seu ponto com o código ${user.code}}`);
  } else {
    res.status(404).send('Falha ao criar usuário');
  }
});

// DELETE a user by ID
router.delete('/users/:id', async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.sendStatus(204);
  } else {
    res.status(404).send('User not found');
  }
});

export default router;
