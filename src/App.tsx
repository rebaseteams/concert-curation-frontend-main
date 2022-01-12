import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosRequestConfig } from 'axios';
import {
  BrowserRouter, Link, Route, Routes, Navigate,
} from 'react-router-dom';
import { Result, Spin } from 'antd';

// importing services
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
import { DownloadService } from './services/download.service';
import LandingPage from './visualLayer/pages/landing';
import { DocusignInterface } from './model/interfaces/docusign';
import SuperAdminDashboard from './visualLayer/pages/superadmin/dashboard';

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
    },
    resources: {
      AUTH_DOMAIN,
    },
  }
   : AppOptions,
): () => JSX.Element | null {
  const HeaderComponent = createHeaderComponent();
  const DashboardComponent = createDashboardComponent(
    { artistRecommendation, documentsService },
  );
  const ArtistPage = createArtistPage({ artistService });

  const RecommendationPage = createRecommendationPage({
    downloadService, artistRecommendation, documentsService,
  });

  const EditorPage = createEditorPage({
    documentsService,
    docusignService,
  });

  return function App(): JSX.Element | null {
    const [auth, setAuth] = useState(false);
    const {
      getAccessTokenSilently, isAuthenticated,
    } = useAuth0();
    getAccessTokenSilently().then((token) => {
      localStorage.setItem('token', `Bearer ${token}`);
      setAuth(true);
    }).catch(() => {
      setAuth(true);
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
      const toReturn = isAuthenticated ? comp : <Navigate to="/signup" />;
      return toReturn;
    };

    return (
      auth
        ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HeaderComponent />}>
                <Route index element={<LandingPage />} />
                <Route path="/dashboard" element={authenticate(<DashboardComponent />)} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
                <Route path="/artist/:id" element={authenticate(<ArtistPage />)} />
                <Route path="/superadmin/dashboard" element={authenticate(<SuperAdminDashboard />)} />
              </Route>
              <Route path="/recommendations/:recommendationId" element={authenticate(<RecommendationPage />)} />
              <Route path="/editor/:id" element={authenticate(<EditorPage />)} />
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
