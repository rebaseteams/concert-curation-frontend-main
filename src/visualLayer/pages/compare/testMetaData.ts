export const metadata = [
  {
    name: 'Demographics',
    description: 'Demographics information of artists', // TODO: Get correct heading from client.
    data: [
      {
        type: 'stackbar',
        combined: true,
        name: 'Age',
        mapperFunctionName: 'DemographicsStackAgeGetter',
      },
      {
        type: 'stackbar',
        combined: true,
        name: 'Gender',
        mapperFunctionName: 'DemographicsStackGenderGetter',
      },
      {
        type: 'stackbar',
        combined: true,
        name: 'Income',
        mapperFunctionName: 'DemographicsStackIncomeGetter',
      },
    ],
  },
  {
    name: 'Followers Growth',
    description: 'To show the followers growth trend for the artist on different platform', // TODO
    data: [
      {
        type: 'line',
        combined: true,
        name: 'Spotify',
        mapperFunctionName: 'FollowersSpotifyGetter',
      },
      {
        type: 'line',
        combined: true,
        name: 'Twitter',
        mapperFunctionName: 'FollowersTwitterGetter',
      },
      {
        type: 'line',
        combined: true,
        name: 'Youtube',
        mapperFunctionName: 'FollowersYoutubeGetter',
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
        mapperFunctionName: 'EducationGetter',
      },
    ],
  },
  {
    name: 'Personality traits', // TODO: Get proper heading and description
    description: 'This information is about Personality Traits', // TODO
    data: [
      {
        type: 'radar',
        combined: false,
        name: 'Personality traits radar chart',
        mapperFunctionName: 'RadialPersonalityTraitsGetter',
      },
    ],
  },
];
