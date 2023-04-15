import { Sequelize } from 'sequelize-typescript';
import { db_host, db_port, db_name, db_user, db_password } from '../../config';
import { User } from '../../models/user.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: db_host,
  port: db_port,
  database: db_name,
  username: db_user,
  password: db_password,
});

sequelize.addModels([User]);

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
});
