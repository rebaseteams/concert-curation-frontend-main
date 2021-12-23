import { DownloadService } from '../../services/download.service';
import ArtistInterface from '../interfaces/artist';
import { ArtistRecommendationInterface } from '../interfaces/artistRecommendation';
import { DocumentsInterface } from '../interfaces/documents';
import { DocusignInterface } from '../interfaces/docusign';

export type Provider = (props: { children: JSX.Element }) => JSX.Element;

export interface Config {
  mode: 'production' | 'development';

  services: {
    downloadService: DownloadService,
    artistRecommendation: ArtistRecommendationInterface,
    documentsService: DocumentsInterface,
    artistService: ArtistInterface,
    docusignService: DocusignInterface
  };

  providers: {
    // Auth: Provider;
  }
}
