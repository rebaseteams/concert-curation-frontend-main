/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.dark.css';
import config from './config';

ReactDOM.render(
  <Auth0Provider
    domain={config.AUTH_DOMAIN}
    clientId={config.AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={config.AUTH_AUDIENCE}
    scope={config.AUTH_SCOPE}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
