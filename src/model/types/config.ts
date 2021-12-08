import ArtistRecommendationInterface from '../interfaces/artistRecommendation';

export type Provider = (props: { children: JSX.Element }) => JSX.Element;

export interface Config {
  mode: 'production' | 'development';

  services: {
    artistRecommendation: ArtistRecommendationInterface
  };

  providers: {
    Auth: Provider;
  }
}
