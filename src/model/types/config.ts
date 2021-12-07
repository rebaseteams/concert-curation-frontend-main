export type Provider = (props: { children: JSX.Element }) => JSX.Element;

export interface Config {
  mode: 'production' | 'development';

  // services: { };

  providers: {
    Auth: Provider;
  }
}
