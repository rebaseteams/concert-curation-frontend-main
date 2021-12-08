import { ArtistRecommendationInterface } from '../interfaces/artistRecommendation';
import { DocumentsInterface } from '../interfaces/documents';

export type Provider = (props: { children: JSX.Element }) => JSX.Element;

export interface Config {
  mode: 'production' | 'development';

  services: {
    artistRecommendation: ArtistRecommendationInterface,
    documentsService: DocumentsInterface
  };

  providers: {
    Auth: Provider;
  }
}
