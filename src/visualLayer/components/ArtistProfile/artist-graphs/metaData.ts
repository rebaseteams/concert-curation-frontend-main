export const metaData = [
  {
    name: 'Followers Growth',
    description: 'To show the followers growth trend for the artist on different platform', // TODO
    data: [
      {
        type: 'line',
        combined: true,
        name: 'Spotify',
        mapperFunctionName: 'SpotifyLineGraphGetter',
      },
      {
        type: 'line',
        combined: false,
        name: 'Twitter',
        mapperFunctionName: 'TwitterLineGraphGetter',
      },
    ],

  },
  {
    name: 'Education', // TODO: Get proper heading and description
    description: 'This information is about Education', // TODO
    data: [
      {
        type: 'pie',
        combined: false,
        name: 'Education',
        mapperFunctionName: 'EducationPieChartGetter',
      },
    ],
  },
];
