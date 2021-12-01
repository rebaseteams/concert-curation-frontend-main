/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ArtistPieChart from './ArtistPieChart';

const mockArtistsData = [
  {
    artistId: 'artist-0',
    artistName: 'automatic_amber_slug',
    artistImage: 'https://source.unsplash.com/200x200/?avatar',
    matchPercentage: 90,
    matchAttributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geoLocation: {
              lat: 40,
              long: 80,
            },
          },
          venueCapacity: 12000,
          matchPercentage: 80,
        },
      ],
      age: {
        ageGroup: '18-30',
        matchPercentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genreName: 'Hollywood',
          matchPercentage: 94,
        },
      ],
      associatedBrands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logoUrl: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logoUrl: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'acute_gold_reindeer is popular single with a lots of hits',
  },
  {
    artistId: 'artist-1',
    artistName: 'melodic_white_tiger',
    artistImage: 'https://source.unsplash.com/200x200/?avatar',
    matchPercentage: 89,
    matchAttributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geoLocation: {
              lat: 40,
              long: 80,
            },
          },
          venueCapacity: 12000,
          matchPercentage: 80,
        },
      ],
      age: {
        ageGroup: '18-30',
        matchPercentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genreName: 'Hollywood',
          matchPercentage: 94,
        },
      ],
      associatedBrands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logoUrl: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logoUrl: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'objective_aquamarine_hoverfly is popular single with a lots of hits',
  },
  {
    artistId: 'artist-2',
    artistName: 'sure_harlequin_otter',
    artistImage: 'https://source.unsplash.com/200x200/?avatar',
    matchPercentage: 88,
    matchAttributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geoLocation: {
              lat: 40,
              long: 80,
            },
          },
          venueCapacity: 12000,
          matchPercentage: 80,
        },
      ],
      age: {
        ageGroup: '18-30',
        matchPercentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genreName: 'Hollywood',
          matchPercentage: 94,
        },
      ],
      associatedBrands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logoUrl: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logoUrl: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'distinctive_purple_marlin is popular single with a lots of hits',
  },
  {
    artistId: 'artist-3',
    artistName: 'present_orange_duck',
    artistImage: 'https://source.unsplash.com/200x200/?avatar',
    matchPercentage: 87,
    matchAttributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geoLocation: {
              lat: 40,
              long: 80,
            },
          },
          venueCapacity: 12000,
          matchPercentage: 80,
        },
      ],
      age: {
        ageGroup: '18-30',
        matchPercentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genreName: 'Hollywood',
          matchPercentage: 94,
        },
      ],
      associatedBrands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logoUrl: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logoUrl: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'sad_copper_snipe is popular single with a lots of hits',
  },
  {
    artistId: 'artist-4',
    artistName: 'excellent_peach_whippet',
    artistImage: 'https://source.unsplash.com/200x200/?avatar',
    matchPercentage: 86,
    matchAttributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geoLocation: {
              lat: 40,
              long: 80,
            },
          },
          venueCapacity: 12000,
          matchPercentage: 80,
        },
      ],
      age: {
        ageGroup: '18-30',
        matchPercentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genreName: 'Hollywood',
          matchPercentage: 94,
        },
      ],
      associatedBrands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logoUrl: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logoUrl: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'tender_maroon_haddock is popular single with a lots of hits',
  },
  {
    artistId: 'artist-5',
    artistName: 'cute_maroon_sailfish',
    artistImage: 'https://source.unsplash.com/200x200/?avatar',
    matchPercentage: 85,
    matchAttributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geoLocation: {
              lat: 40,
              long: 80,
            },
          },
          venueCapacity: 12000,
          matchPercentage: 80,
        },
      ],
      age: {
        ageGroup: '18-30',
        matchPercentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genreName: 'Hollywood',
          matchPercentage: 94,
        },
      ],
      associatedBrands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logoUrl: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logoUrl: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'visiting_rose_narwhal is popular single with a lots of hits',
  },
  {
    artistId: 'artist-6',
    artistName: 'uncomfortable_copper_snail',
    artistImage: 'https://source.unsplash.com/200x200/?avatar',
    matchPercentage: 84,
    matchAttributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geoLocation: {
              lat: 40,
              long: 80,
            },
          },
          venueCapacity: 12000,
          matchPercentage: 80,
        },
      ],
      age: {
        ageGroup: '18-30',
        matchPercentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genreName: 'Hollywood',
          matchPercentage: 94,
        },
      ],
      associatedBrands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logoUrl: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logoUrl: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'diverse_blush_chickadee is popular single with a lots of hits',
  },
  {
    artistId: 'artist-7',
    artistName: 'firm_brown_mule',
    artistImage: 'https://source.unsplash.com/200x200/?avatar',
    matchPercentage: 83,
    matchAttributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geoLocation: {
              lat: 40,
              long: 80,
            },
          },
          venueCapacity: 12000,
          matchPercentage: 80,
        },
      ],
      age: {
        ageGroup: '18-30',
        matchPercentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genreName: 'Hollywood',
          matchPercentage: 94,
        },
      ],
      associatedBrands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logoUrl: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logoUrl: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'underground_gray_wildebeest is popular single with a lots of hits',
  },
  {
    artistId: 'artist-8',
    artistName: 'underground_maroon_mongoose',
    artistImage: 'https://source.unsplash.com/200x200/?avatar',
    matchPercentage: 82,
    matchAttributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geoLocation: {
              lat: 40,
              long: 80,
            },
          },
          venueCapacity: 12000,
          matchPercentage: 80,
        },
      ],
      age: {
        ageGroup: '18-30',
        matchPercentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genreName: 'Hollywood',
          matchPercentage: 94,
        },
      ],
      associatedBrands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logoUrl: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logoUrl: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'supreme_peach_slug is popular single with a lots of hits',
  },
  {
    artistId: 'artist-9',
    artistName: 'national_violet_pheasant',
    artistImage: 'https://source.unsplash.com/200x200/?avatar',
    matchPercentage: 81,
    matchAttributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geoLocation: {
              lat: 40,
              long: 80,
            },
          },
          venueCapacity: 12000,
          matchPercentage: 80,
        },
      ],
      age: {
        ageGroup: '18-30',
        matchPercentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genreName: 'Hollywood',
          matchPercentage: 94,
        },
      ],
      associatedBrands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logoUrl: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logoUrl: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'mild_salmon_tern is popular single with a lots of hits',
  },
];

// Mock function
const patchConcertData = (discardedArtistId: string) => discardedArtistId;

describe('Artist Pie Chart Component', () => {
  // test('should display Matching Brands in the component', () => {
  //   render(<Router><ArtistPieChart data={mockArtistsData} /></Router>);
  //   expect(screen.getAllByText('Parade Hall').toBeInTheDocument());
  // });
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

  it('should render Questions component', () => {
    render(<Router><ArtistPieChart data={mockArtistsData} recommendationId="8767jgj-7675-644" patchConcertData={patchConcertData} /></Router>);
    expect(screen.getByTestId('matchingBrands')).toBeInTheDocument();
  });
});
