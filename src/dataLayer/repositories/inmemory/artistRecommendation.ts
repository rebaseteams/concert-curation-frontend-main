/* eslint-disable no-console */
import ArtistRecommendationInterface from '../../../model/interfaces/artistRecommendation';
import { QuestionsUI } from '../../../model/types/questions';
import {
  AddRecommendationResponse,
  DeleteRecommendationResponse,
  GetAllRecommendationsResponse,
  GetRecommendationResponse,
} from '../../../model/types/service-response';
import allConcertMockData, { addRecommendationMockData, getRecommendationMockData } from './allConcertMockData';

export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  addNewRecommendation = async (concertData : QuestionsUI): Promise<AddRecommendationResponse> => {
    console.log('add new recommendation', concertData);
    return new Promise((resolve) => {
      resolve(addRecommendationMockData);
    });
  };

  getAllRecommendations = async (): Promise<GetAllRecommendationsResponse> => {
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
