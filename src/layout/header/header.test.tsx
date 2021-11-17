/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderComponet from '.';

describe('Header Componet', () => {
  test('renders cuttime logo in Header component', () => {
    render(<HeaderComponet />);
    expect(screen.getByTestId('cuttime-logo')).toBeInTheDocument();
  });
});
