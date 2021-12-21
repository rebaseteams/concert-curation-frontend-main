/* eslint-disable no-nested-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Button, Layout, Input, notification,
} from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import './header.scss';
import cuttimelogo from './cuttime.png';
import IconRenderer from '../../components/IconRenderer';
// import { UseAuth0 } from '../../../model/types/auth0User';

const { Header } = Layout;
const { Search } = Input;

// export interface CreateHeaderComponentProps {
//   useAuth0: UseAuth0;
// }

export function createHeaderComponent(): () => JSX.Element | null {
  const onSearch = (value: string) => {
    notification.info({
      message: `Searching ${value}`,
      placement: 'bottomRight',
    });
  };

  return function HeaderComponent() {
    const {
      isAuthenticated, user, logout, loginWithRedirect, isLoading,
    } = useAuth0();
    const navigate = useNavigate();
    const renderPublic = () => (
      <div className="row-flex justify-between align-center">
        <Button
          style={{ marginLeft: '10px' }}
          type="primary"
          onClick={() => loginWithRedirect()}
        >
          Log in
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          type="primary"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </div>
    );

    const renderPrivate = () => (
      <div id="extra" className="row-flex justify-between align-center">
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
              <Link to="/">
                <img
                  data-testid="cuttime-logo"
                  src={cuttimelogo}
                  alt="cuttimelogo"
                />
              </Link>
              <span className="text-size-4 cuttime">Cuttime .fm</span>
            </div>
            {isLoading ? <div>Loading....</div>
              : (!isAuthenticated || !user ? renderPublic() : renderPrivate())}
            <div id="hamb">{ IconRenderer('menu') }</div>
          </div>
        </Header>
        <Outlet />
      </>
    );
  };
}
