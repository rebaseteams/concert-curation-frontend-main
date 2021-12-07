/* eslint-disable import/prefer-default-export */
const server = {
  dev: {
    protocol: 'http',
    host: 'localhost',
    port: '4000',
  },
  prod: {
    protocol: 'http',
    host: '52.66.164.23',
    port: '80',
  },
};

export const DEV_SERVER = `${server.dev.protocol}://${server.dev.host}:${server.dev.port}`;
export const PROD_SERVER = `${server.prod.protocol}://${server.prod.host}:${server.prod.port}/api`;
export const AUTH_DOMAIN = 'https://dev-bnfcgcth.us.auth0.com';
export const AUTH_CLIENT_ID = 'B7hdgDYvx7fyGktJJxxidg9qg0Xvbq0s';
export const AUTH_CONNECTION = 'Username-Password-Authentication';
