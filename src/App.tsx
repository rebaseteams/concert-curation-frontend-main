/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import './App.scss';
import axios, { AxiosRequestConfig } from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import LayoutComponent from './layout';
import config from './config';

function App():JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [auth, setAuth] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  // const goToSignup = () => history.push('signup');
  getAccessTokenSilently().then((token) => {
    localStorage.setItem('token', `Bearer ${token}`);
    setLoaded(true);
    setAuth(true);
  }).catch(() => {
    setLoaded(false);
    setAuth(true);
  });

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
      // Extract the userid from the token
        if (!req.headers) {
          req.headers = {};
        }
        const userId = localStorage.getItem('userid');
        if (userId) req.headers.userId = userId;
        const token = localStorage.getItem('token');
        if (token) req.headers.authorization = token;
      }
      return req;
    },
    (err) => Promise.reject(err),
  );

  return (
    <div className="app-container">
      {auth ? <LayoutComponent auth={loaded} /> : <div>Loading...</div>}
    </div>
  );
}

// TODO: temparary hack to insure we have user id when application loads
// In future we will remove this when we have JWD tocken
localStorage.setItem('userid', '1238989');
export default App;
