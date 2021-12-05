import { Auth0ContextInterface } from '@auth0/auth0-react';

export interface Auth0User {
  email: string;
  name: string;
  picture: string;
}

export type UseAuth0 = () => Auth0ContextInterface<Auth0User>;
