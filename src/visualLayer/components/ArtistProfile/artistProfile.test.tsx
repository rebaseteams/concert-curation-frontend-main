import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import createArtistProfile from '.';
import { artistMockDataNew } from '../../../dataLayer/repositories/inmemory/mockData/artist';

const ArtistProfile = createArtistProfile({
  artist: artistMockDataNew,
});

describe('Artist Profile Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  it('should show artist name', () => {
    render(<BrowserRouter><ArtistProfile /></BrowserRouter>);
    expect(screen.getByText(artistMockDataNew.name)).toBeInTheDocument();
  });
});
