import { useAuth0 } from '@auth0/auth0-react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Auth0User } from '../model/types/auth0User';
import { TokenService } from '../services/token.service';
import { InMemoryAuth0Provider } from './auth-context.in-memory';

function setup(user: Auth0User) {
  const tokenService: TokenService = {
    getData: async (token: string) => JSON.parse(token),
    getToken: async (data) => JSON.stringify({ ...data, issuer: 'json-token' }),
  };

  return {
    tokenService,
    render: () => renderHook(
      () => useAuth0(),
      {
        wrapper: ({ children }) => InMemoryAuth0Provider({ children, user, tokenService }),
      },
    ),
  };
}

async function assertValidToken(serviceToken: TokenService, token: string, user: Auth0User) {
  const data = await serviceToken.getData(token);

  expect(data).toStrictEqual({
    email: user.email,
    canonicalId: user.email,
    issuer: expect.anything(),
    subject: user.email,
  });
}

describe('InMemoryAuthContext0Provider', () => {
  const user: Auth0User = {
    email: 'john.doe@cmpress.com',
    name: 'John Doe',
    picture: 'picture.png',
  };

  it('should not be authenticated by default', () => {
    const { render } = setup(user);
    const { result } = render();

    expect(result.current.isAuthenticated).toBeFalsy();
  });

  describe('loginWithRedirect()', () => {
    it('should authenticate the user', async () => {
      const { render } = setup(user);
      const { result } = render();

      await act(() => result.current.loginWithRedirect());

      expect(result.current.isAuthenticated).toBeTruthy();
    });

    it('should populate the user field', async () => {
      const { render } = setup(user);
      const { result } = render();

      await act(() => result.current.loginWithRedirect());

      expect(result.current.user).toEqual(user);
    });
  });

  describe('loginWithPopup()', () => {
    it('should authenticate the user', async () => {
      const { render } = setup(user);
      const { result } = render();

      await act(() => result.current.loginWithPopup());

      expect(result.current.isAuthenticated).toBeTruthy();
    });

    it('should populate the user field', async () => {
      const { render } = setup(user);
      const { result } = render();

      await act(() => result.current.loginWithPopup());

      expect(result.current.user).toEqual(user);
    });
  });

  describe('logout()', () => {
    it('should log the user out', async () => {
      const { render } = setup(user);
      const { result } = render();

      await act(() => result.current.loginWithRedirect());

      act(() => result.current.logout());

      expect(result.current.isAuthenticated).toBeFalsy();
    });

    it('should empty the user field', async () => {
      const { render } = setup(user);
      const { result } = render();

      await act(() => result.current.loginWithPopup());

      act(() => result.current.logout());

      expect(result.current.user).toBeUndefined();
    });
  });

  describe('getAccessTokenWithPopup()', () => {
    it('should authenticate the user if needed', async () => {
      const { render } = setup(user);
      const { result } = render();

      await act(async () => {
        await result.current.getAccessTokenWithPopup();
      });

      expect(result.current.isAuthenticated).toBeTruthy();
    });

    it('should return a valid token', async () => {
      const { render, tokenService } = setup(user);
      const { result } = render();

      let token: string;
      await act(async () => {
        token = await result.current.getAccessTokenWithPopup();
      });

      await assertValidToken(tokenService, token, user);
    });
  });

  describe('getTokenSilently()', () => {
    it('should authenticate the user if needed', async () => {
      const { render } = setup(user);
      const { result } = render();

      await act(async () => {
        await result.current.getAccessTokenSilently();
      });

      expect(result.current.isAuthenticated).toBeTruthy();
    });

    it('should return a valid token', async () => {
      const { render, tokenService } = setup(user);
      const { result } = render();

      let token: string;
      await act(async () => {
        token = await result.current.getAccessTokenSilently();
      });

      await assertValidToken(tokenService, token, user);
    });
  });
});
