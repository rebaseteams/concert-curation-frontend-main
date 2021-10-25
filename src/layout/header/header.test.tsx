/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderComponet from '.';

describe('Header Componet', () => {
  test('renders Header component', () => {
    render(<HeaderComponet />);
    expect(screen.getByText('Cuttime')).toBeInTheDocument();
  });
});
