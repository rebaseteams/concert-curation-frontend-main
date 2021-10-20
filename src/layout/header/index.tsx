/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const HeaderComponet = ():any => (
  <Header>
    <nav>
      <h3 className="app-logo">Concert Recomandator</h3>
    </nav>
  </Header>
);

export default HeaderComponet;
