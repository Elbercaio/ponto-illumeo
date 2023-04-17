/* eslint-disable no-console */
import * as dotenv from 'dotenv';

try {
  dotenv.config({ path: '${__dirname}/../.env' });
} catch (e) {
  console.warn('dotenv not found, running in docker?');
}

export const port = Number(process.env.API_PORT);
export const databaseHost = String(process.env.DB_HOST);
export const databasePort = Number(process.env.DB_PORT);
export const database = String(process.env.DB_DATABASE);
export const databaseUser = String(process.env.DB_USERNAME);
export const databasePassword = String(process.env.DB_PASSWORD);
