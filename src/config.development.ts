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
import TemplatesService from './dataLayer/services/templates';
import TemplatesRepo from './dataLayer/repositories/http/templates';
import Auth from './dataLayer/services/auth';
import AuthRepo from './dataLayer/repositories/http/auth';
import Roles from './dataLayer/services/roles';
import RolesRepo from './dataLayer/repositories/http/roles';
import Resources from './dataLayer/services/resources';
import ResourcesRepo from './dataLayer/repositories/http/resources';
import UsersRepo from './dataLayer/repositories/http/users';
import Users from './dataLayer/services/users';

// const tokenService = new UnsignedTokenService();
const scopes = ['GET:artists/recommendations', 'POST:artists/recommendations', 'DELETE:artists/recommendations'];

const server = 'http://localhost:4000/cc-bff';

export const config: Config = {
  mode: 'development',
  resources: {
    SERVER: server,
    AUTH_DOMAIN: 'https://dev-yga6eln3.us.auth0.com',
    AUTH_CLIENT_ID: 'oVngjMIrVInLZTxwFv9k64FS4cQ34d5V',
    AUTH_CONNECTION: 'Username-Password-Authentication',
    AUTH_AUDIENCE: 'concertcuration.dev.api',
    AUTH_SCOPE: scopes.join(' '),
  },
  services: {
    artistRecommendation: new ArtistRecommendation(new ArtistRecommendationRepo(server)),
    documentsService: new Documents(new DocumentsRepo(server)),
    artistService: new Artist(new ArtistRepo(server)),
    downloadService: new HtmlDownloadService(),
    docusignService: new DocusignService(new DocusignRepo(server)),
    templatesService: new TemplatesService(new TemplatesRepo(server)),
    AuthService: new Auth(new AuthRepo(server)),
    rolesService: new Roles(new RolesRepo(server)),
    resourceService: new Resources(new ResourcesRepo(server)),
    userService: new Users(new UsersRepo(server)),
  },
  providers: {
  },
};
