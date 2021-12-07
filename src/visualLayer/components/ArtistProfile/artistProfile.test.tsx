import React from 'react';
import { render, screen } from '@testing-library/react';
import createArtistProfile from '.';
import { artistMockDataNew } from '../../../dataLayer/repositories/inmemory/mockData/artist';

const ArtistProfile = createArtistProfile({
  artist: artistMockDataNew,
});

describe('Artist Profile Component', () => {
  it('should show artitst name', () => {
    render(<ArtistProfile />);
    expect(screen.getByText('Michael Jackson')).toBeInTheDocument();
  });
});
