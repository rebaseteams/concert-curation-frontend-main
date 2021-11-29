/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { PatchRequest } from '../types/patch-request';
import { QuestionsUI } from '../types/questions';
import {
  AddRecommendationResponse,
  DeleteRecommendationResponse,
  GetAllRecommendationsResponse,
  GetRecommendationResponse,
} from '../types/service-response';

export default interface ArtistRecommendationInterface {
  addNewRecommendation(concertData : QuestionsUI): Promise<AddRecommendationResponse>;
  getAllRecommendations(): Promise<GetAllRecommendationsResponse>;
  getRecommendation(recommendationId : string): Promise<GetRecommendationResponse>;
  discardArtist(data : PatchRequest): void;
  deleteRecommendation(recommendationId : string): Promise<DeleteRecommendationResponse>;
};
