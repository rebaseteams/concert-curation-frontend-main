/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { RecommendtionValidation } from '../types/artist-recommendation';
import { PatchRequest } from '../types/patch-request';
import { QuestionsUI } from '../types/questions';
import {
  AddRecommendationResponse,
  DeleteRecommendationResponse,
  GetAllRecommendationsResponse,
  GetRecommendationResponse,
  PatchRecommendationResponse,
  ValidateRecommendationFieldsResponse,
} from '../types/service-response';

export interface ArtistRecommendationInterface {
  addNewRecommendation(concertData : QuestionsUI): Promise<AddRecommendationResponse>;
  getAllRecommendations(): Promise<GetAllRecommendationsResponse>;
  getRecommendation(recommendationId : string): Promise<GetRecommendationResponse>;
  discardArtist(data : PatchRequest): Promise<PatchRecommendationResponse>;
  deleteRecommendation(recommendationId : string): Promise<DeleteRecommendationResponse>;
  validateRecommendationFields(
    fields: RecommendtionValidation
  ): Promise<ValidateRecommendationFieldsResponse>;
};
