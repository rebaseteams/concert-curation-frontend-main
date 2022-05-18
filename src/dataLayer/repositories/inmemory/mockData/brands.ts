import { NewBrandResponse } from '../../../../model/types/brand';
import latestRelease from './latestReleaseVideosa';
import { AllBrandsList } from '../../../../model/types/brands';

export const allBrandsMockData: Array<AllBrandsList> = [
  {
    id: '120rjd38',
    name: 'Vans',
  },
  {
    id: '893adc597',
    name: 'Adidas',
  },
];

export const brandMockDataNew: NewBrandResponse = {
  id: '874djsb898732',
  name: 'Adidas',
  logo: 'https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg',
  website: 'https://www.adidas.co.in/',
  contact: '',
  demographics: [
    {
      demographicName: 'gender',
      fields: [
        {
          name: 'male',
          value: 28,
        },
        {
          name: 'female',
          value: 72,
        },
      ],
    },
    {
      demographicName: 'age group',
      fields: [
        {
          name: '18 - 25',
          value: 6,
        },
        {
          name: '26 - 35',
          value: 6,
        },
        {
          name: '36 - 60',
          value: 8,
        },
        {
          name: '60 +',
          value: 4,
        },
      ],
    },
  ],
  media_handles: [
    {
      handleName: 'twitter',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIyZOzUZc6Nbea-QuCDeoL1tP9HkNG8XQ_hj-7RnfzqMboo3i5FuDYvQUkA7wq8fcyJBA&usqp=CAU',
      url: '',
    },
    {
      handleName: 'spotify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
      url: '',
    },
    {
      handleName: 'youtube',
      logo: 'https://www.freepnglogos.com/uploads/youtube-logo-png/youtube-transparent-youtube-play-button-png-download-clip-art-11.png',
      url: '',
    },
  ],
  brand_affinity: {
    xAxisData: [
      '100',
      '101',
      '102',
    ],
    yAxisData: [
      {
        name: 'Brand1',
        data: [
          {
            xAxis: '100',
            yAxis: 0,
          },
          {
            xAxis: '101',
            yAxis: 16,
          }],
      },
      {
        name: 'Brand2',
        data: [
          {
            xAxis: '100',
            yAxis: 0,
          },
          {
            xAxis: '101',
            yAxis: 83,
          }],
      },
    ],
  },
  latest_youtube_release: latestRelease,
  youtube_insights: {
    channel: {
      id: 'adidas',
      subscribersCount: Math.floor(Math.random() * 10000),
      viewsCount: Math.floor(Math.random() * 1000000),
      videosCount: Math.floor(Math.random() * 1000),
      avgViewsCount: Math.floor(Math.random() * 100000),
      avgLikesCount: Math.floor(Math.random() * 100000),
      engagementRatio: 73.3,
    },
    videos: [
      {
        playlistId: 'playlist-1',
        songCount: Math.floor(Math.random() * 10),
        viewsCount: Math.floor(Math.random() * 1000000),
        likesCount: Math.floor(Math.random() * 100000),
        dislikeCount: Math.floor(Math.random() * 10000),
        commentsCount: Math.floor(Math.random() * 10000),
      },
      {
        playlistId: 'playlist-2',
        songCount: Math.floor(Math.random() * 10),
        viewsCount: Math.floor(Math.random() * 1000000),
        likesCount: Math.floor(Math.random() * 100000),
        dislikeCount: Math.floor(Math.random() * 10000),
        commentsCount: Math.floor(Math.random() * 10000),
      },
    ],
  },
};
