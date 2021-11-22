/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './App.scss';
import axios, { AxiosRequestConfig } from 'axios';
import LayoutComponent from './layout';
import extractUserToken from './services/userToken';
import config from './config';
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
    <div className="app-container">
      <LayoutComponent />
    </div>
  );
}

// TODO: temparary hack to insure we have user id when application loads
// In future we will remove this when we have JWD tocken
localStorage.setItem('userid', '1238989');
export default App;
