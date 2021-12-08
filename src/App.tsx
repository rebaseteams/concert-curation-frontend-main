import { useEffect } from 'react';

import { useAuth0 as defaultUseAuth0 } from '@auth0/auth0-react';
import axios, { AxiosRequestConfig } from 'axios';

import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom';

import { Result } from 'antd';

// importing services
import extractUserToken from './services/userToken';

import { AUTH_DOMAIN } from './config';

// importing components
import { createHeaderComponent } from './visualLayer/pages/header';

import { createDashboardComponent } from './visualLayer/pages/dashboard';

import Signup from './visualLayer/pages/signup/signup';

import RecommendationPage from './visualLayer/pages/recommendation';

import ArtistPage from './visualLayer/pages/artists/artist';

import EditorContainer from './visualLayer/pages/editor/editor';

// styles
import './App.scss';
import { UseAuth0 } from './model/types/auth0User';
import { ArtistRecommendationInterface } from './model/interfaces/artistRecommendation';
import { DocumentsInterface } from './model/interfaces/documents';

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
      req.headers.userId = extractUserToken();
    }
    return req;
  },
  (err) => Promise.reject(err),
);

// TODO: temparary hack to insure we have user id when application loads
// In future we will remove this when we have JWD tocken
localStorage.setItem('userid', '1238989');

export interface AppOptions {
  useAuth0?: UseAuth0;
  artistRecommendation: ArtistRecommendationInterface;
  documentsService: DocumentsInterface
}

export function createApp(
  {
    useAuth0 = defaultUseAuth0,
    artistRecommendation,
    documentsService,
  } : AppOptions,
): () => JSX.Element | null {
  const HeaderComponent = createHeaderComponent({ useAuth0 });
  const DashboardComponent = createDashboardComponent(
    { artistRecommendation, documentsService },
  );

  return function App(): JSX.Element | null {
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
    useEffect(
      () => {
        if (isAuthenticated || isLoading) {
          return;
        }
        loginWithRedirect();
      }, [],
    );

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderComponent />}>
            <Route index element={<DashboardComponent />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
          </Route>
          {/* <HeaderComponet /> */}
          <Route path="/recommendations/:recommendationId" element={<RecommendationPage />} />
          <Route path="/editor/:id" element={<EditorContainer />} />
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
    );
  };
}
