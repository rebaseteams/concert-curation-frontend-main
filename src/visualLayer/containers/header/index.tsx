/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Layout } from 'antd';
import './header.scss';
import cuttimelogo from './cuttime.png';
import IconRenderer from '../../components/IconRenderer';

const { Header } = Layout;

const HeaderComponet = ():JSX.Element => (
  <Header
    style={{ background: 'none', padding: 'none' }}
    className="header-container width-md"
  >
    <div className="app-logo">
      <a href={window.location.origin}>
        <img data-testid="cuttime-logo" src={cuttimelogo} alt="cuttimelogo" />
      </a>
    </div>
    <div className="row-flex justify-between align-center">
      {IconRenderer('avatar')}
      <Button style={{ marginLeft: '10px' }} type="primary">Log out</Button>
    </div>
  </Header>
);

export default HeaderComponet;
