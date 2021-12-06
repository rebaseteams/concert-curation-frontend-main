/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Button, Layout, Input, notification,
} from 'antd';
import './header.scss';
import cuttimelogo from './cuttime.png';
import IconRenderer from '../../components/IconRenderer';
import { UseAuth0 } from '../../../model/types/auth0User';

const { Header } = Layout;
const { Search } = Input;

export interface CreateHeaderComponentProps {
  useAuth0: UseAuth0;
}

export function createHeaderComponent({
  useAuth0,
}: CreateHeaderComponentProps): () => JSX.Element | null {
  const onSearch = (value: string) => {
    notification.info({
      message: `Searching ${value}`,
      placement: 'bottomRight',
    });
  };

  return function HeaderComponent() {
    const {
      isAuthenticated, user, logout, loginWithRedirect,
    } = useAuth0();

    const renderPublic = () => (
      <div className="row-flex justify-between align-center">
        <Button
          style={{ marginLeft: '10px' }}
          type="primary"
          onClick={() => loginWithRedirect()}
        >
          Log in
        </Button>
      </div>
    );

    const renderPrivate = () => (
      <div className="row-flex justify-between align-center">
        <Search
          placeholder="search"
          allowClear
          onSearch={onSearch}
          style={{
            background: '#444',
            color: '#FFF',
            width: 354,
            marginRight: '70px',
          }}
        />
        {IconRenderer('waving_hand')}
        <span className="my-3 text-size-4">
          Hello
          {' '}
          {user?.name}
        </span>
        {IconRenderer('avatar')}
        {isAuthenticated ? (
          <Button
            style={{ marginLeft: '10px' }}
            type="primary"
            onClick={() => logout()}
          >
            Log out
          </Button>
        ) : null}
      </div>
    );

    return (
      <>
        <Header
          style={{ background: 'none', padding: 'none' }}
          className="header-container"
        >
          <div className="header width-md">
            <div className="app-logo">
              <a href={window.location.origin}>
                <img
                  data-testid="cuttime-logo"
                  src={cuttimelogo}
                  alt="cuttimelogo"
                />
              </a>
              <span className="text-size-4 cuttime">Cuttime .fm</span>
            </div>
            {!isAuthenticated || !user ? renderPublic() : renderPrivate()}
          </div>
        </Header>
        <Outlet />
      </>
    );
  };
}
