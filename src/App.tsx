import React from 'react';

import axios, { AxiosRequestConfig } from 'axios';

import {
  BrowserRouter, Link, Route, Switch,
} from 'react-router-dom';

import { Result } from 'antd';

// importing services
import extractUserToken from './services/userToken';

import config from './config';

// importing components
import HeaderComponet from './visualLayer/containers/header';

import DashboardComponent from './visualLayer/containers/dashboard';

import Signup from './visualLayer/containers/signup/signup';

import RecommendationPage from './visualLayer/containers/RecommendationPage';

import ArtistPage from './visualLayer/containers/artists/artist';

import EditorContainer from './visualLayer/containers/editor/editor';

// styles
import './App.scss';

// For GET requests
axios.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    // Add configurations here
    const whiteListedEndpoints: Array<string> = [
      `${config.AUTH_DOMAIN}/dbconnections/signup`,
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

function App():JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HeaderComponet />
          <DashboardComponent />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/recommendations/:recommendationId" exact>
          <RecommendationPage />
        </Route>
        <Route path="/artist/:id" exact>
          <ArtistPage />
        </Route>
        <Route path="/editor/:id" exact>
          <EditorContainer />
        </Route>
        <Route path="/*" exact>
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to="/">Back Home</Link>}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

// TODO: temparary hack to insure we have user id when application loads
// In future we will remove this when we have JWD tocken
localStorage.setItem('userid', '1238989');
export default App;
