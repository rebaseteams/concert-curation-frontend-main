/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth0Context, Auth0ContextInterface } from '@auth0/auth0-react';
import { ReactNode, useState } from 'react';
import { Auth0User } from '../model/types/auth0User';
import { TokenService } from '../services/token.service';

export interface InMemoryAuth0ProviderProps {
 children: ReactNode;
 user: Auth0User;
 tokenService: TokenService;
}

export function InMemoryAuth0Provider({
  children,
  user,
  tokenService,
}: InMemoryAuth0ProviderProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value: Auth0ContextInterface | any = {
    buildAuthorizeUrl: async () => '',
    buildLogoutUrl: () => '',
    getAccessTokenSilently: async () => value.loginWithRedirect()
      .then(() => tokenService.getToken({
        email: user.email,
        canonicalId: user.email,
        subject: user.email,
      })),
    getAccessTokenWithPopup: async () => value.loginWithRedirect()
      .then(() => tokenService.getToken({
        email: user.email,
        canonicalId: user.email,
        subject: user.email,
      })),
    getIdTokenClaims: async () => ({ __raw: '' }),
    handleRedirectCallback: async () => ({}),
    isAuthenticated,
    isLoading: false,
    loginWithPopup: async () => setIsAuthenticated(true),
    loginWithRedirect: async () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  };

  if (isAuthenticated) {
    value.user = user;
  }

  return <Auth0Context.Provider value={value}>{children}</Auth0Context.Provider>;
}
