/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { createHeaderComponent } from '.';

describe.only('Header Component', () => {
  test('renders cuttime logo in Header component', () => {
    const HeaderComponent = createHeaderComponent({ useAuth0 });
    render(<HeaderComponent />);
    expect(screen.getByTestId('cuttime-logo')).toBeInTheDocument();
  });
});
