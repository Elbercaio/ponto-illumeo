import axios from 'axios';
import { environment } from './enviroment';

export const http = axios.create({
  baseURL: environment.apiURI,
  headers: {
    'Content-type': 'application/json',
  },
});
