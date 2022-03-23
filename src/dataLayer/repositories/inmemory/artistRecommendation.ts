/* eslint-disable no-console */
import { ArtistRecommendationInterface } from '../../../model/interfaces/artistRecommendation';
import { RecommendtionValidation } from '../../../model/types/artist-recommendation';
import { PatchRequest } from '../../../model/types/patch-request';
import { QuestionsUI } from '../../../model/types/questions';
import {
  AddRecommendationResponse,
  DeleteRecommendationResponse,
  GetAllRecommendationsResponse,
  GetRecommendationResponse,
  PatchRecommendationResponse,
  ValidateRecommendationFieldsResponse,
} from '../../../model/types/service-response';
import allConcertMockData, { addRecommendationMockData, getRecommendationMockData, patchRecommendationMockData } from './mockData/allConcertMockData';

export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateRecommendationFields = async (fields: RecommendtionValidation):
  Promise<ValidateRecommendationFieldsResponse> => {
    throw new Error('Method not implemented.');
  }

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

  getRecommendation = async (recommendationId : string): Promise<GetRecommendationResponse> => {
    console.log('get recommendation : ', recommendationId);
    return new Promise((resolve) => {
      resolve(getRecommendationMockData);
    });
  };

  discardArtist = async (patchData: PatchRequest): Promise<PatchRecommendationResponse> => {
    console.log('discard artist', patchData);
    return new Promise((resolve) => {
      resolve(patchRecommendationMockData);
    });
  };

  deleteRecommendation = async (recommendationId : string):
    Promise<DeleteRecommendationResponse> => {
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
