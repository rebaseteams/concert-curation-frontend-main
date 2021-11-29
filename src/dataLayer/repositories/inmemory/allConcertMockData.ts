import { AddRecommendationResponse, GetAllRecommendationsResponse, GetRecommendationResponse } from '../../../model/types/service-response';
import { recommendedArtistsMockData } from './recomendedArtistsMockData';

const allConcertMockData: GetAllRecommendationsResponse = {
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

export const getRecommendationMockData: GetRecommendationResponse = {
  error: false,
  message: 'ok',
  status: 200,
  data: recommendedArtistsMockData,
};

export const addRecommendationMockData: AddRecommendationResponse = {
  error: false,
  message: 'no error',
  status: '200',
  data: {
    id: '8383683y3y896',
    concertName: 'Ruby the Diamond',
    dateCreated: 'Mon 21-11-2021 23:44:58',
    status: true,
  },
};

export default allConcertMockData;
