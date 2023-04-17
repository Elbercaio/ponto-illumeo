import { Sequelize } from 'sequelize-typescript';
import { database, databaseHost, databasePassword, databasePort, databaseUser } from './config';

const db = new Sequelize({
  dialect: 'postgres',
  host: databaseHost,
  port: databasePort,
  database: database,
  username: databaseUser,
  password: databasePassword,
  define: {
    underscored: true,
  },
});

export default db;
