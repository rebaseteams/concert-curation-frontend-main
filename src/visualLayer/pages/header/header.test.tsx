/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createHeaderComponent } from '.';
import { Auth0User } from '../../../model/types/auth0User';
import { createUseAuth0Mock } from '../../../../test/mocks/use-auth0.mock';
import AdvancedSearchInterface from '../../../model/interfaces/advancedSearch';

function setup({
  user = {
    email: 'john.doe@cuttime.com',
    name: 'John Doe',
    picture: 'picture.png',
  },
  isAuthenticated = false,
}: {
  user?: Auth0User;
  isAuthenticated?: boolean;
}) {
  const useAuth0 = createUseAuth0Mock();
  useAuth0.isAuthenticated = true;

  if (isAuthenticated) {
    useAuth0.user = user;
  }
  const HeaderComponent = createHeaderComponent({
    advancedSearchService: {} as AdvancedSearchInterface,
  });

  return {
    HeaderComponent,
    useAuth0,
  };
}

describe('Header Component', () => {
  test('renders cuttime logo in Header component', () => {
    const { HeaderComponent } = setup({});

    render(<BrowserRouter><HeaderComponent /></BrowserRouter>,
      { wrapper: ({ children }) => <>{children}</> });

    expect(screen.getByTestId('cuttime-logo')).toBeInTheDocument();
  });

  test.todo('should render private block when user isAuthenticated');

  test.todo('should render public block when user not isAuthenticated');
});
