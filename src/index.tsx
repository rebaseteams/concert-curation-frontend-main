/* eslint-disable linebreak-style */
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.scss';
import { createApp } from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.dark.css';
import { config } from './config.dev';
import {
  AUTH_AUDIENCE, AUTH_CLIENT_ID, AUTH_DOMAIN, AUTH_SCOPE,
} from './config';

const {
  artistRecommendation, documentsService, artistService, downloadService,
} = config.services;

const App = createApp(
  {
    artistRecommendation, documentsService, artistService, downloadService,
  },
);

ReactDOM.render(
  <Auth0Provider
    domain={AUTH_DOMAIN}
    clientId={AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={AUTH_AUDIENCE}
    scope={AUTH_SCOPE}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
