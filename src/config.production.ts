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
import Users from './dataLayer/services/users';
import UsersRepo from './dataLayer/repositories/http/users';
import ActionsHttpRep from './dataLayer/repositories/http/actions';
import Actions from './dataLayer/services/actions';
import Venues from './dataLayer/services/venues';
import VenuesRepo from './dataLayer/repositories/http/venues';
import EventsType from './dataLayer/services/eventsType';
import EventsTypeRepo from './dataLayer/repositories/http/eventsType';
import AdvacedSearchRepo from './dataLayer/repositories/http/advancedSearch';
import AdvancedSearch from './dataLayer/services/advancedSearch';
import Brands from './dataLayer/services/brands';
import BrandsRepo from './dataLayer/repositories/http/brands';
import Genres from './dataLayer/services/genres';
import GenresRepo from './dataLayer/repositories/http/genres';

// const tokenService = new UnsignedTokenService();
const scopes = ['GET:artists/recommendations', 'POST:artists/recommendations', 'DELETE:artists/recommendations'];

const server = 'https://live-api.cuttime.fm/cc-bff';
export const config: Config = {
  mode: 'production',
  resources: {
    SERVER: server,
    AUTH_DOMAIN: 'https://dev-bnfcgcth.us.auth0.com',
    AUTH_CLIENT_ID: 'B7hdgDYvx7fyGktJJxxidg9qg0Xvbq0s',
    AUTH_CONNECTION: 'Username-Password-Authentication',
    AUTH_AUDIENCE: 'http://localhost:4000',
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
    actionsService: new Actions(new ActionsHttpRep(`${server}/actions`)),
    venuesService: new Venues(new VenuesRepo(server)),
    eventsTypeService: new EventsType(new EventsTypeRepo(server)),
    advancedSearchService: new AdvancedSearch(new AdvacedSearchRepo(server)),
    brandsService: new Brands(new BrandsRepo(server)),
    genresService: new Genres(new GenresRepo(server)),

  },
  providers: {
  },
};
