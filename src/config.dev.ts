/* eslint-disable import/prefer-default-export */
import { UnsignedTokenService } from './adapters/token.service.unsigned';
import { InMemoryAuth0Provider } from './contexts/auth-context.in-memory';
import { Config } from './model/types/config';

const tokenService = new UnsignedTokenService();

export const config: Config = {
  mode: 'development',
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
