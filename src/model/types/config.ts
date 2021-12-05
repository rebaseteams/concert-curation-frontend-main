export type Provider = (props: { children: JSX.Element }) => JSX.Element;

export interface Config {
  mode: 'production' | 'development';

  // services: { };

  providers: {
    Auth: Provider;
  }

  // TODO: This may be discarded
  constants: {
    DEV_SERVER: string;
    PROD_SERVER: string;
    AUTH_DOMAIN: string;
    AUTH_CLIENT_ID: string;
    AUTH_CONNECTION: string;
  }
}
