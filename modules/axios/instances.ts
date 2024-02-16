/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios';

type Mode = 'dev' | 'prod';

const mode = 'dev';

export const DEV = axios.create({
  baseURL: 'https://hearinguru.com/api/',
});

export const PROD = axios.create({
  baseURL: 'https://hearinguru.com/api/',
});

export const axiosAuth = axios.create({
  baseURL: 'https://hearinguru.com/api/',
  headers: { 'Content-Type': 'application/json' },
});

const server = mode === 'dev' ? DEV : PROD;

export default server;
