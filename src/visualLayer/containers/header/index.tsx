/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Button, Layout, Input, notification,
} from 'antd';
import './header.scss';
import cuttimelogo from './cuttime.png';
import IconRenderer from '../../components/IconRenderer';

const { Header } = Layout;
const { Search } = Input;

const HeaderComponet = ():JSX.Element => {
  const onSearch = (value: string) => {
    notification.info({ message: `Searching ${value}`, placement: 'bottomRight' });
  };

  return (
    <Header
      style={{ background: 'none', padding: 'none' }}
      className="header-container"
    >
      <div className="header width-md">
        <div className="app-logo">
          <a href={window.location.origin}>
            <img data-testid="cuttime-logo" src={cuttimelogo} alt="cuttimelogo" />
          </a>
          <span className="text-size-4 cuttime">Cuttime .fm</span>
        </div>
        <div className="row-flex justify-between align-center">
          <Search
            placeholder="search"
            allowClear
            onSearch={onSearch}
            style={{
              background: '#444', color: '#FFF', width: 354, marginRight: '70px',
            }}
          />
          {IconRenderer('waving_hand')}
          <span className="my-3 text-size-4">
            Hello Krina
          </span>
          {IconRenderer('avatar')}
          <Button style={{ marginLeft: '10px' }} type="primary">Log out</Button>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponet;
