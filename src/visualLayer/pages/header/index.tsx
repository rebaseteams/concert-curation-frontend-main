/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Button, Layout, notification,
} from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import './header.scss';
import { useState } from 'react';
import cuttimelogo from './cuttime.png';
import IconRenderer from '../../components/IconRenderer';
import AdvancedSearch from '../../components/AdvancedSearch';
import { FilterOptions } from '../../components/AdvancedSearch/types';
import AdvancedSearchInterface from '../../../model/interfaces/advancedSearch';
import { AdvancedSearchQuery, AdvancedSearchResponseData } from '../../../model/types/advancedSearch';
// import { UseAuth0 } from '../../../model/types/auth0User';

const { Header } = Layout;

type HeaderComponentProps ={
  advancedSearchService: AdvancedSearchInterface;
}

export function createHeaderComponent({
  advancedSearchService,
}: HeaderComponentProps): () => JSX.Element | null {
  return function HeaderComponent() {
    const navigate = useNavigate();

    const filterOptions:FilterOptions = [
      {
        category: 'Artist',
        subcategories: ['Genre', 'Gender', 'Personality'],
      },
      {
        category: 'Brand',
        subcategories: ['b1', 'b2', 'b3'],
      },
      {
        category: 'Venue Location',
      },

    ];
    const [searchResults, setSearchResults] = useState<AdvancedSearchResponseData>([]);

    const handleSearching = async (q: AdvancedSearchQuery) => {
      if (!q.query) return setSearchResults([]);
      const resp = await advancedSearchService.get(q);
      if (!resp.success) return setSearchResults([]);
      return setSearchResults(resp.data.results);
    };
    const handleResultSelect = async (query: AdvancedSearchQuery) => {
      const resp = await advancedSearchService.get(query);
      if (!resp.success) return null;
      if (resp.data.results.length === 0) {
        return notification.info({
          message: `nothing found for ${query.query}`,
          duration: 3,
        });
      }
      if (resp.data.results.length === 1) {
        const redirectPage = resp.data.results[0].destinationUrl;
        if (redirectPage) {
          navigate(redirectPage);
        }
        return notification.info({
          message: 'Redirecting',
          duration: 2,
        });
      }
      return notification.info({
        message: 'Redirecting to search results page',
        duration: 3,
      });
    };

    const {
      isAuthenticated, user, logout, loginWithRedirect, isLoading,
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
        <AdvancedSearch
          filterOptions={filterOptions}
          onSearching={handleSearching}
          searchResults={searchResults}
          onResultSelect={handleResultSelect}
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
            onClick={() => {
              logout({ returnTo: window.location.origin });
              localStorage.removeItem('roles');
              localStorage.removeItem('token');
            }}
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
