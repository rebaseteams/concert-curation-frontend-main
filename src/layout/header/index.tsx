/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Layout, Button } from 'antd';
import './header.scss';
import { useAuth0 } from '@auth0/auth0-react';
import cuttimelogo from './cuttime.png';

const { Header } = Layout;

const HeaderComponet = ():JSX.Element => {
  const { logout } = useAuth0();
  return (
    <Header style={{ background: 'none' }} className="header-container">
      <nav>
        <h3 className="app-logo">
          <a href={window.location.origin}>
            <img data-testid="cuttime-logo" src={cuttimelogo} alt="cuttimelogo" />
          </a>
          <Button onClick={() => {
            localStorage.removeItem('token');
            logout();
          }}
          >
            Logout
          </Button>
        </h3>
      </nav>
    </Header>
  );
};

export default HeaderComponet;
