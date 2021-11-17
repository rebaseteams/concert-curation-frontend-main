/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Layout } from 'antd';
import './header.scss';
import cuttimelogo from './cuttimelogo.png';

const { Header } = Layout;

const HeaderComponet = ():JSX.Element => (
  <Header style={{ background: 'none' }} className="header-container">
    <nav>
      <h3 className="app-logo">
        <a href={window.location.origin}>
          <img data-testid="cuttime-logo" src={cuttimelogo} alt="cuttimelogo" />
        </a>
      </h3>
    </nav>
  </Header>
);

export default HeaderComponet;
