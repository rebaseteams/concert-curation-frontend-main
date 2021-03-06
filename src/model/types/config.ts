import { DownloadService } from '../../services/download.service';
import ArtistInterface from '../interfaces/artist';
import { ArtistRecommendationInterface } from '../interfaces/artistRecommendation';
import AuthInterface from '../interfaces/auth';
import { DocumentsInterface } from '../interfaces/documents';
import { DocusignInterface } from '../interfaces/docusign';
import { RolesInterface } from '../interfaces/roles';
import { ResourcesInterface } from '../interfaces/resources';
import { TemplatesInterface } from '../interfaces/templates';
import { UsersInterface } from '../interfaces/users';
import { ActionsInterface } from '../interfaces/actions';
import { VenuesInterface } from '../interfaces/venues';
import { EventsTypeInterface } from '../interfaces/eventsType';
import AdvancedSearchInterface from '../interfaces/advancedSearch';
import { BrandsInterface } from '../interfaces/brands';
import { GenresInterface } from '../interfaces/genres';

export type Provider = (props: { children: JSX.Element }) => JSX.Element;

export interface Config {
  mode: 'production' | 'development';

  resources: {
    SERVER: string;
    AUTH_DOMAIN: string;
    AUTH_CLIENT_ID: string;
    AUTH_CONNECTION: string;
    AUTH_AUDIENCE: string;
    AUTH_SCOPE: string;
  };

  services: {
    downloadService: DownloadService,
    artistRecommendation: ArtistRecommendationInterface,
    documentsService: DocumentsInterface,
    artistService: ArtistInterface,
    userService: UsersInterface,
    docusignService: DocusignInterface
    templatesService: TemplatesInterface,
    AuthService: AuthInterface,
    rolesService: RolesInterface,
    resourceService: ResourcesInterface,
    actionsService: ActionsInterface,
    venuesService: VenuesInterface,
    eventsTypeService: EventsTypeInterface,
    advancedSearchService: AdvancedSearchInterface,
    brandsService: BrandsInterface,
    genresService: GenresInterface,
  };

  providers: {
    // Auth: Provider;
  }
}
