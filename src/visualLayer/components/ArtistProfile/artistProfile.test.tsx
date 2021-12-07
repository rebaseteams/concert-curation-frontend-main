import React from 'react';
import { render, screen } from '@testing-library/react';
import createArtistProfile from '.';
import { artistMockDataNew } from '../../../dataLayer/repositories/inmemory/mockData/artist';

const ArtistProfile = createArtistProfile({
  artist: artistMockDataNew,
});

describe.skip('Artist Profile Component', () => {
  it.skip('should show artist name', () => {
    render(<ArtistProfile />);
    expect(screen.getByText('Michael Jackson')).toBeInTheDocument();
  });
});
