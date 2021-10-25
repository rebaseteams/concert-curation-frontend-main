/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseURL = 'http://52.66.164.23:3000';

const mockData = [
  {
    artist_name: 'Justin',
    artist_id: '0001',
    artist_image: 'https://source.unsplash.com/200x200/?avatar',
    match_percentage: 95,
    match_attributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geo_location: {
              lat: 40,
              lag: 80,
            },
          },
          venue_capacity: 12000,
          match_percentage: 80,
        },
        {
          id: '11112',
          name: 'Lonaly Location',
          address: {
            pincode: 111032,
            country: 'USA',
            city: 'london',
            geo_location: {
              lat: 60,
              lag: 80,
            },
          },
          venue_capacity: 12000,
          match_percentage: 80,
        },
      ],
      age: {
        age_group: '18-30',
        match_percentage: 90,
      },
      gender: {
        male: 4,
        female: 96,
      },
      genre: [
        {
          genre_name: 'Hollywood',
          match_percentage: 98,
        },
      ],
      associated_brands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logo_url: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logo_url: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'Justin have a good fanbase in the selected venue location',
  },
  {
    artist_name: 'Kuber',
    artist_id: '0002',
    artist_image: 'https://source.unsplash.com/200x200/?avatar',
    match_percentage: 90,
    match_attributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geo_location: {
              lat: 40,
              lag: 80,
            },
          },
          venue_capacity: 12000,
          match_percentage: 80,
        },
      ],
      age: {
        age_group: '18-30',
        match_percentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genre_name: 'Hollywood',
          match_percentage: 94,
        },
      ],
      associated_brands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logo_url: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logo_url: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'Kuber is most respected artist and has rich fanbase',
  },
  {
    artist_name: 'Rocky',
    artist_id: '0003',
    artist_image: 'https://source.unsplash.com/200x200/?avatar',
    match_percentage: 95,
    match_attributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geo_location: {
              lat: 40,
              lag: 80,
            },
          },
          venue_capacity: 12000,
          match_percentage: 80,
        },
      ],
      age: {
        age_group: '18-30',
        match_percentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genre_name: 'Hollywood',
          match_percentage: 94,
        },
      ],
      associated_brands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logo_url: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logo_url: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'Rocky is a young pop singer liked by many youth',
  },
  {
    artist_name: 'Honey Singh',
    artist_id: '0004',
    artist_image: 'https://source.unsplash.com/200x200/?avatar',
    match_percentage: 95,
    match_attributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geo_location: {
              lat: 40,
              lag: 80,
            },
          },
          venue_capacity: 12000,
          match_percentage: 80,
        },
      ],
      age: {
        age_group: '18-30',
        match_percentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genre_name: 'Hollywood',
          match_percentage: 94,
        },
      ],
      associated_brands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logo_url: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logo_url: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'Justin have a good fanbase in the selected venue location',
  },
  {
    artist_name: 'Mika singh',
    artist_id: '0005',
    artist_image: 'https://source.unsplash.com/200x200/?avatar',
    match_percentage: 95,
    match_attributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geo_location: {
              lat: 40,
              lag: 80,
            },
          },
          venue_capacity: 12000,
          match_percentage: 80,
        },
      ],
      age: {
        age_group: '18-30',
        match_percentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genre_name: 'Hollywood',
          match_percentage: 94,
        },
      ],
      associated_brands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logo_url: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logo_url: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'Justin have a good fanbase in the selected venue location',
  },
  {
    artist_name: 'Mical',
    artist_id: '0006',
    artist_image: 'https://source.unsplash.com/200x200/?avatar',
    match_percentage: 95,
    match_attributes: {
      venues: [
        {
          id: '11111',
          name: 'Parade Hall',
          address: {
            pincode: 111022,
            country: 'USA',
            city: 'london',
            geo_location: {
              lat: 40,
              lag: 80,
            },
          },
          venue_capacity: 12000,
          match_percentage: 80,
        },
      ],
      age: {
        age_group: '18-30',
        match_percentage: 90,
      },
      gender: {
        male: 10,
        female: 90,
      },
      genre: [
        {
          genre_name: 'Hollywood',
          match_percentage: 94,
        },
      ],
      associated_brands: [
        {
          id: '22222',
          name: 'Apple',
          contact: '002233',
          website: 'https://apple.com',
          logo_url: '//logo.clearbit.com/apple.com',
        },
        {
          id: '22223',
          name: 'Google',
          contact: '0022643',
          website: 'https://google.com',
          logo_url: '//logo.clearbit.com/google.com',
        },
      ],
    },
    summary: 'Justin have a good fanbase in the selected venue location',
  },
];

async function getRecomendedArtists(data: any) {
  // const response = await axios.post(`${baseURL}/recommender/api/getMatchData/`, data);
  // return response.data;

  return mockData;
}

export default getRecomendedArtists;
