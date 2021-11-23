/* eslint-disable no-console */
import ArtistRecommendationInterface from '../../../model/interfaces/artistRecommendation';
import { DeleteRecommendationResponse, GetRecommendationResponse, ServiceResponse } from '../../../model/types/service-response';
import allConcertMockData, { getRecommendationMockData } from './allConcertMockData';

export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  addNewRecommendation = () => {
    console.log('add new recommendation');
  };

  getAllRecommendations = async (): Promise<ServiceResponse> => {
    console.log('get all recommendations');
    return new Promise((resolve) => {
      resolve(allConcertMockData);
    });
  };

  getRecommendation = (recommendationId : string): Promise<GetRecommendationResponse> => {
    console.log('get recommendation : ', recommendationId);
    return new Promise((resolve) => {
      resolve(getRecommendationMockData);
    });
  };

  discardArtist = () => {
    console.log('discard artist');
  };

  deleteRecommendation = (recommendationId : string): Promise<DeleteRecommendationResponse> => {
    console.log('delete recommendation');
    return new Promise((resolve) => {
      resolve({
        error: false,
        data: {
          formId: recommendationId,
          success: true,
        },
        status: 404,
        message: 'ok',
      });
    });
  };
}
