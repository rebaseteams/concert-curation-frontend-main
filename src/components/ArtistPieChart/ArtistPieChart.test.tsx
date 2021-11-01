/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ArtistPieChart from './ArtistPieChart';

describe('Artist Pie Chart Component', () => {
  test('should display Matching Brands in the component', () => {
    render(<Router><ArtistPieChart /></Router>);
    expect(screen.getAllByText('Matching Brands :')[0]).toBeInTheDocument();
  });
});
