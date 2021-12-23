/* eslint-disable import/prefer-default-export */
import { HtmlDownloadService } from './adapters/html-download.service';
// import { UnsignedTokenService } from './adapters/token.service.unsigned';
// import { InMemoryAuth0Provider } from './contexts/auth-context.in-memory';
import ArtistRecommendationRepo from './dataLayer/repositories/http/artistRecommendation';
import DocumentsRepo from './dataLayer/repositories/http/documents';
import ArtistRepo from './dataLayer/repositories/http/artist';
import Artist from './dataLayer/services/artist';
import ArtistRecommendation from './dataLayer/services/artistRecommendation';
import Documents from './dataLayer/services/documents';
import { Config } from './model/types/config';
import DocusignService from './dataLayer/services/docusign';
import DocusignRepo from './dataLayer/repositories/http/docusign';

// const tokenService = new UnsignedTokenService();

export const config: Config = {
  mode: 'development',
  services: {
    artistRecommendation: new ArtistRecommendation(new ArtistRecommendationRepo()),
    documentsService: new Documents(new DocumentsRepo()),
    artistService: new Artist(new ArtistRepo()),
    downloadService: new HtmlDownloadService(),
    docusignService: new DocusignService(new DocusignRepo()),
  },
  providers: {
  },
};
