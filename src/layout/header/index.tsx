/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Layout } from 'antd';
import './header.scss';

const { Header } = Layout;

const HeaderComponet = ():any => (
  <Header style={{ background: 'none' }} className="header-container">
    <nav>
      <h3 className="app-logo">Concert Recomandator</h3>
    </nav>
  </Header>
);

export default HeaderComponet;
