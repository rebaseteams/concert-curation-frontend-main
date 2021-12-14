/* eslint-disable linebreak-style */

import { ArtistRecommendation } from '../../../../model/types/artist-recommendation';

/* eslint-disable import/prefer-default-export */
export const recommendedArtistsMockData: ArtistRecommendation = {
  concertData: {
    userId: '76376',
    dateCreated: 'Mon 23-11-2021 12:34:55',
    id: 'form101',
    concertName: 'Friday Night Rock',
    eventType: 'Colleges and Universities',
    venue: ['London', 'Mumbai'],
    artistBudget: { min: 20000, max: 50000 },
    sponsorshipType: 'Direct sales',
    wantedBrands: [{
      brandId: '896763',
      brandName: 'Coca',
    }],
    unwantedBrands: [{
      brandId: '896963',
      brandName: 'Limca',
    }],
    targetAudience: {
      ageGroup: ['26-35', '36-60'],
      gender: ['female', 'both'],
      genre: [{
        genreId: '8734',
        genreName: 'Bollywood',
      }],
    },
    whatSellsMost: {
      beer: [],
      liquor: [],
      softDrinks: [],
    },
  },
  status: true,
  artists: [
    {
      artistName: 'Justin',
      artistId: '0001',
      artistImage: 'https://source.unsplash.com/200x200/?avatar',
      matchPercentage: 95,
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
          {
            id: '11112',
            name: 'Lonaly Location',
            address: {
              pincode: 111032,
              country: 'USA',
              city: 'london',
              geoLocation: {
                lat: 60,
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
          male: 4,
          female: 96,
        },
        genre: [
          {
            genreName: 'Hollywood',
            matchPercentage: 98,
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
      summary: 'Justin have a good fanbase in the selected venue location',
    },
    {
      artistName: 'Kuber',
      artistId: '0002',
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
      summary: 'Kuber is most respected artist and has rich fanbase',
    },
    {
      artistName: 'Rocky',
      artistId: '0003',
      artistImage: 'https://source.unsplash.com/200x200/?avatar',
      matchPercentage: 95,
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
      summary: 'Rocky is a young pop singer liked by many youth',
    },
    {
      artistName: 'Honey Singh',
      artistId: '0004',
      artistImage: 'https://source.unsplash.com/200x200/?avatar',
      matchPercentage: 95,
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
      summary: 'Justin have a good fanbase in the selected venue location',
    },
    {
      artistName: 'Mika singh',
      artistId: '0005',
      artistImage: 'https://source.unsplash.com/200x200/?avatar',
      matchPercentage: 95,
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
      summary: 'Justin have a good fanbase in the selected venue location',
    },
    {
      artistName: 'Mical',
      artistId: '0006',
      artistImage: 'https://source.unsplash.com/200x200/?avatar',
      matchPercentage: 95,
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
      summary: 'Justin have a good fanbase in the selected venue location',
    },
  ],
  discardedArtists: [],
};
