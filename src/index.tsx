/* eslint-disable linebreak-style */
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.scss';
import { createApp } from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.dark.css';
import { config as devConfig } from './config.development';
import { config as prodConfig } from './config.production';

// console.log(process.env);

const { services, resources } = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
const {
  artistRecommendation,
  documentsService,
  artistService,
  downloadService,
  docusignService,
  templatesService,
  AuthService,
  resourceService,
} = services;

const {
  AUTH_AUDIENCE, AUTH_DOMAIN, AUTH_CLIENT_ID, AUTH_SCOPE,
} = resources;

const App = createApp(
  {
    services: {
      artistRecommendation,
      documentsService,
      artistService,
      downloadService,
      docusignService,
      templatesService,
      AuthService,
      resourceService,
    },
    resources: {
      AUTH_DOMAIN,
    },
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
