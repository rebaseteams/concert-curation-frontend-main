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
    ],
  },
];
