/* eslint-disable import/prefer-default-export */
import { UnsignedTokenService } from './adapters/token.service.unsigned';
import { InMemoryAuth0Provider } from './contexts/auth-context.in-memory';
import { Config } from './model/types/config';

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
const PROD_SERVER = `${server.prod.protocol}://${server.prod.host}:${server.prod.port}/api`;
const AUTH_DOMAIN = 'https://dev-bnfcgcth.us.auth0.com';
const AUTH_CLIENT_ID = 'B7hdgDYvx7fyGktJJxxidg9qg0Xvbq0s';
const AUTH_CONNECTION = 'Username-Password-Authentication';

const tokenService = new UnsignedTokenService();

export const config: Config = {
  mode: 'development',
  constants: {
    DEV_SERVER,
    PROD_SERVER,
    AUTH_DOMAIN,
    AUTH_CLIENT_ID,
    AUTH_CONNECTION,
  },
  // services: {},
  providers: {
    Auth: ({ children }) => InMemoryAuth0Provider({
      children,
      tokenService,
      user: {
        email: 'john.doe@gmail.com',
        name: 'John Doe',
        picture: 'https://avatar.oxro.io/avatar.svg?name=John+Doe&background=6ab04c&color=000',
      },
    }),
  },
};
