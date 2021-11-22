import { ServiceResponse } from '../../../model/types/service-response';

const allConcertMockData: ServiceResponse = {
  error: false,
  message: 'no error',
  status: '200',
  data: [
    {
      id: '873868683973',
      concertName: 'Concert',
      status: true,
      dateCreated: 'Mon 21-11-2021 23:22:12',

    },
  ],
};

export default allConcertMockData;
