import { Sequelize } from 'sequelize-typescript';
import { db_host, db_port, db_user, db_password, db_database } from './config';

const db = new Sequelize({
  dialect: 'postgres',
  host: db_host,
  port: db_port,
  database: db_database,
  username: db_user,
  password: db_password,
  define: {
    underscored: true,
  },
});

export default db;
