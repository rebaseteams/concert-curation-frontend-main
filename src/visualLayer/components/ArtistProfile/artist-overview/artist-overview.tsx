import React from 'react';
import { render, screen } from '@testing-library/react';
import ArtistOverview from '.';
import { artistMockDataNew } from '../../../../dataLayer/repositories/inmemory/mockData/artist';

describe('Artist Overview', () => {
  it('should render facebool followers', () => {
    render(<ArtistOverview artist={artistMockDataNew} />);
    expect(screen.getByText('122342')).toBeInTheDocument();
  });
});
