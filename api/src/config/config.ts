import * as dotenv from 'dotenv';

try {
  dotenv.config({ path: '${__dirname}/../.env' });
} catch (e) {
  console.warn('dotenv not found, running in docker?');
}

export const port = Number(process.env.API_PORT);
export const db_host = String(process.env.DB_HOST);
export const db_port = Number(process.env.DB_PORT);
export const db_database = String(process.env.DB_DATABASE);
export const db_user = String(process.env.DB_USERNAME);
export const db_password = String(process.env.DB_PASSWORD);