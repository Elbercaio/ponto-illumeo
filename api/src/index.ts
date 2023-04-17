/* eslint-disable no-console */
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import http from 'http';
import { port } from './config/config';
import db from './config/database';
import recordsRoutes from './routes/user-records.routes';
import usersRoutes from './routes/users.routes';
import { User, UserRecord } from './shared';

async function bootstrap(): Promise<void> {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.use('/users', usersRoutes);
  app.use('/records', recordsRoutes);

  app.get('/', async (_: Request, res: Response) => {
    res.status(200).json({
      message: 'Hello World',
    });
  });
  try {
    await db.sync({ force: false }).then(() => {
      console.log('Database synced');

      db.addModels([User, UserRecord]);
      const server = http.createServer(app);
      server.listen(port, () => {
        console.log(`API started at http://localhost:${port}`);
      });
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
bootstrap();
