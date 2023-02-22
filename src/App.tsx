import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosRequestConfig } from 'axios';
import {
  BrowserRouter, Link, Route, Routes, Navigate,
} from 'react-router-dom';
import { notification, Result, Spin } from 'antd';

// importing services
import { CompareData } from '@rebaseitlabs/compare-data';
import extractUserToken from './services/userToken';

// importing components
import { createHeaderComponent } from './visualLayer/pages/header';
import { createDashboardComponent } from './visualLayer/pages/dashboard';
import Signup from './visualLayer/pages/signup/signup';
import { createRecommendationPage } from './visualLayer/pages/recommendation';
import { createEditorPage } from './visualLayer/pages/editor/editor';

// styles
import './App.scss';
// import { UseAuth0 } from './model/types/auth0User';
import { ArtistRecommendationInterface } from './model/interfaces/artistRecommendation';
import { DocumentsInterface } from './model/interfaces/documents';
import ArtistInterface from './model/interfaces/artist';
import createArtistPage from './visualLayer/pages/artists/artist';
import createBrandPage from './visualLayer/pages/brands/brand';
import { DownloadService } from './services/download.service';
import LandingPage from './visualLayer/pages/landing';
import { DocusignInterface } from './model/interfaces/docusign';
import SuperAdminDashboard from './visualLayer/pages/superadmin/dashboard';
import { TemplatesInterface } from './model/interfaces/templates';
import AuthInterface from './model/interfaces/auth';
import { ResourcesInterface } from './model/interfaces/resources';
import { UsersInterface } from './model/interfaces/users';
import { RolesInterface } from './model/interfaces/roles';
import createCompareComponent from './visualLayer/pages/compare';
import * as functionMappper from './visualLayer/pages/compare/functionMapper';
import { ActionsInterface } from './model/interfaces/actions';
import { getSsd, setSsd } from './utils/systemSpecificDataManager';
import { systemSpecificDataGetter } from './utils/systemSpecificDataGetter';
import { VenuesInterface } from './model/interfaces/venues';
import { EventsTypeInterface } from './model/interfaces/eventsType';
import createProfilePage from './visualLayer/pages/profile';
import AdvancedSearchInterface from './model/interfaces/advancedSearch';
import { BrandsInterface } from './model/interfaces/brands';
import { GenresInterface } from './model/interfaces/genres';
import { createHeader } from './v2/ui/components/header';
import { createConcertList } from './v2/ui/pages/concerts-list';
import { createUseConcerts, UseConcerts } from './v2/data/hooks/concert-lists/use-concert-lists';

// TODO: temparary hack to insure we have user id when application loads
// In future we will remove this when we have JWD tocken
localStorage.setItem('userid', '1238989');

export interface AppOptions {
  services: {
    artistRecommendation: ArtistRecommendationInterface;
    documentsService: DocumentsInterface;
    artistService: ArtistInterface;
    downloadService: DownloadService;
    docusignService: DocusignInterface;
    resourceService: ResourcesInterface;
    templatesService: TemplatesInterface;
    AuthService: AuthInterface;
    userService: UsersInterface;
    rolesService: RolesInterface;
    actionsService: ActionsInterface;
    venuesService: VenuesInterface;
    eventsTypeService: EventsTypeInterface;
    advancedSearchService: AdvancedSearchInterface;
    brandsService: BrandsInterface,
    genresService: GenresInterface,

  },
  resources: {
    AUTH_DOMAIN: string;
  }
  // useAuth0?: UseAuth0;

}

export function createApp(
  {
    services: {
      // useAuth0 = defaultUseAuth0,
      artistRecommendation,
      documentsService,
      artistService,
      downloadService,
      docusignService,
      templatesService,
      AuthService,
      resourceService,
      userService,
      rolesService,
      actionsService,
      venuesService,
      eventsTypeService,
      advancedSearchService,
      brandsService,
      genresService,
    },
    resources: {
      AUTH_DOMAIN,
    },
  }
   : AppOptions,
): () => JSX.Element | null {
  const HeaderComponent = createHeaderComponent({ advancedSearchService });
  const DashboardComponent = createDashboardComponent(
    {
      artistRecommendation,
      documentsService,
      templatesService,
      venuesService,
      eventsTypeService,
      brandsService,
      genresService,
    },
  );
  const ArtistPage = createArtistPage({ artistService, documentsService, templatesService });

  const BrandPage = createBrandPage({ brandService: brandsService });

  const RecommendationPage = createRecommendationPage({
    downloadService, artistRecommendation, documentsService,
  });
  const compareService = new CompareData(functionMappper);
  const CompareComponent = createCompareComponent({
    compareService,
  });

  const EditorPage = createEditorPage({
    documentsService,
    docusignService,
  });

  const ProfilePage = createProfilePage();

  return function App(): JSX.Element | null {
    const [auth, setAuth] = useState(false);
    const {
      getAccessTokenSilently, isAuthenticated,
    } = useAuth0();
    rolesService.getRoles(0, 200).then((data) => {
      setSsd('allRoles', data.data.roles);
    });
    getAccessTokenSilently().then(async (token) => {
      const expirationDuration = 60 * 60 * 1000; // one hour
      const checkExpirationDuration = 60 * 1000; // one Minute
      localStorage.setItem('token', `Bearer ${token}`);
      await systemSpecificDataGetter(userService, actionsService, rolesService);
      setSsd('expireIn', Date.now() + expirationDuration);
      window.setInterval(() => {
        const expireIn = Number(getSsd('expireIn')) || 1;
        if (Date.now() > expireIn) {
          systemSpecificDataGetter(userService, actionsService, rolesService);
          setSsd('expireIn', Date.now() + expirationDuration);
        }
      }, checkExpirationDuration);
      setAuth(true);
    }).catch(() => {
      setAuth(true);
    });

    notification.config({
      duration: 2,
      placement: 'bottomRight',
    });

    // For GET requests
    axios.interceptors.request.use(
      (req: AxiosRequestConfig) => {
        // Add configurations here
        const whiteListedEndpoints: Array<string> = [
          `${AUTH_DOMAIN}/dbconnections/signup`,
        ];
        if (req.url && whiteListedEndpoints.includes(req.url)) {
          return req;
        }
        if (req) {
          if (!req.headers) {
            req.headers = {};
          }
          // Extract the userid from the token
          const { token } = extractUserToken();
          req.headers.authorization = token;
        }
        return req;
      },
      (err) => Promise.reject(err),
    );

    const authenticate = (comp : JSX.Element) : JSX.Element => {
      const unapproved = getSsd('unapproved');
      // eslint-disable-next-line no-nested-ternary
      const toReturn = isAuthenticated ? unapproved ? <Navigate to="/profile" /> : comp : <Navigate to="/signup" />;
      return toReturn;
    };

    const HeaderV2 = createHeader();
    const ConcertList = createConcertList();
    const useConcerts: UseConcerts = createUseConcerts();

    return (
      auth
        ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HeaderComponent />}>
                <Route index element={<LandingPage />} />
                <Route path="/compare" element={authenticate(<CompareComponent />)} />
                <Route path="/dashboard" element={authenticate(<DashboardComponent />)} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup AuthService={AuthService} />} />
                <Route path="/artist/:id" element={authenticate(<ArtistPage />)} />
                <Route path="/brand/:id" element={authenticate(<BrandPage />)} />
                <Route path="/superadmin/dashboard" element={authenticate(<SuperAdminDashboard resourcesService={resourceService} usersService={userService} rolesService={rolesService} />)} />
                <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />
              </Route>
              <Route path="/recommendations/:recommendationId" element={authenticate(<RecommendationPage />)} />
              <Route path="/editor/:id" element={authenticate(<EditorPage />)} />
              <Route path="/v2" element={<HeaderV2 />}>
                <Route index element={<div>Landing page</div>} />
                <Route path="/v2/concerts" element={<ConcertList useConcerts={useConcerts} />} />
              </Route>
              <Route
                path="/*"
                element={(
                  <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Link to="/">Back Home</Link>}
                  />
            )}
              />
            </Routes>
          </BrowserRouter>
        )
        : (
          <div className="column-flex justify-center align-center" style={{ height: '100vh' }}>
            <Spin size="large" />
          </div>
        )
    );
  };
}
