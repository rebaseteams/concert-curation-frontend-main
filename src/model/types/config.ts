import ArtistInterface from '../interfaces/artist';
import { ArtistRecommendationInterface } from '../interfaces/artistRecommendation';
import { DocumentsInterface } from '../interfaces/documents';

export type Provider = (props: { children: JSX.Element }) => JSX.Element;

export interface Config {
  mode: 'production' | 'development';

  services: {
    artistRecommendation: ArtistRecommendationInterface,
    documentsService: DocumentsInterface,
    artistService: ArtistInterface
  };

  providers: {
    Auth: Provider;
  }
}
