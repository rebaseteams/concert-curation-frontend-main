/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
// import { Auth0Provider } from '@auth0/auth0-react';
import './index.scss';
import { createApp } from './App';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.dark.css';
import { config } from './config';

const { Auth } = config.providers;

const App = createApp({ });

ReactDOM.render(
  // <Auth0Provider
  //   domain={config.AUTH_DOMAIN}
  //   clientId={config.AUTH_CLIENT_ID}
  //   redirectUri={window.location.origin}
  // >
  // </Auth0Provider>,
  <Auth>
    <App />
  </Auth>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
