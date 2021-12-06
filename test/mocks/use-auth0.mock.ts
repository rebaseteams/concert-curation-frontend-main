/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth0ContextInterface } from '@auth0/auth0-react';
import { Auth0User, UseAuth0 } from '../../src/model/types/auth0User';

type Methods =
  | 'buildAuthorizeUrl'
  | 'getAccessTokenSilently'
  | 'getAccessTokenWithPopup'
  | 'getIdTokenClaims'
  | 'handleRedirectCallback'
  | 'loginWithPopup'
  | 'loginWithRedirect'
  | 'logout';

export type UseAuth0Mock =
  & UseAuth0
  & Pick<Auth0ContextInterface<Auth0User>, 'isLoading' | 'isAuthenticated' | 'user' | 'error'>
  & {
    [M in Methods]: jest.Mock<ReturnType<Auth0ContextInterface<Auth0User>[M]>, []>;
  };

const notImplemented = () => {
  throw new Error('not implemented');
};

export function createUseAuth0Mock() {
  const buildAuthorizeUrl = jest.fn().mockImplementation(notImplemented);
  const buildLogoutUrl = jest.fn().mockImplementation(notImplemented);
  const getAccessTokenSilently = jest.fn().mockImplementation(notImplemented);
  const getAccessTokenWithPopup = jest.fn().mockImplementation(notImplemented);
  const getIdTokenClaims = jest.fn().mockImplementation(notImplemented);
  const handleRedirectCallback = jest.fn().mockImplementation(notImplemented);
  const loginWithPopup = jest.fn().mockImplementation(notImplemented);
  const loginWithRedirect = jest.fn().mockImplementation(notImplemented);
  const logout = jest.fn().mockImplementation(notImplemented);

  const useAuth0: UseAuth0Mock = (() => ({
    get isLoading(): boolean {
      return useAuth0.isLoading;
    },
    get isAuthenticated(): boolean {
      return useAuth0.isAuthenticated;
    },
    get user(): Auth0User | undefined {
      return useAuth0.user;
    },
    buildAuthorizeUrl,
    buildLogoutUrl,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    getIdTokenClaims,
    handleRedirectCallback,
    loginWithPopup,
    loginWithRedirect,
    logout,
  })) as any;

  useAuth0.buildAuthorizeUrl = buildAuthorizeUrl;
  useAuth0.buildAuthorizeUrl = buildLogoutUrl;
  useAuth0.getAccessTokenSilently = getAccessTokenSilently;
  useAuth0.getAccessTokenWithPopup = getAccessTokenWithPopup;
  useAuth0.getIdTokenClaims = getIdTokenClaims;
  useAuth0.handleRedirectCallback = handleRedirectCallback;
  useAuth0.loginWithPopup = loginWithPopup;
  useAuth0.loginWithRedirect = loginWithRedirect;
  useAuth0.logout = logout;
  useAuth0.isLoading = false;
  useAuth0.isAuthenticated = false;
  useAuth0.user = undefined;

  return useAuth0;
}
