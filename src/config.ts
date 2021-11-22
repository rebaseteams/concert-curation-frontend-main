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

const DEV_SERVER = `${server.dev.protocol}://${server.dev.host}:${server.dev.port}`;
const PROD_SERVER = `${server.prod.protocol}://${server.prod.host}:${server.prod.port}`;
const AUTH_DOMAIN = 'https://dev-bnfcgcth.us.auth0.com';
const AUTH_CLIENT_ID = 'B7hdgDYvx7fyGktJJxxidg9qg0Xvbq0s';
const AUTH_CONNECTION = 'Username-Password-Authentication';

const config = {
  DEV_SERVER,
  PROD_SERVER,
  AUTH_DOMAIN,
  AUTH_CLIENT_ID,
  AUTH_CONNECTION,
};
export default config;
