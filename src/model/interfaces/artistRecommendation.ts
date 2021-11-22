/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { PatchRequest } from '../types/patch-request';
import { QuestionsUI } from '../types/questions';
import { ServiceResponse } from '../types/service-response';

export default interface ArtistRecommendationInterface {
  addNewRecommendation(concertData : QuestionsUI): void;
  getAllRecommendations(): Promise<ServiceResponse>;
  getRecommendation(recommendationId : string): void;
  discardArtist(data : PatchRequest): void;
  deleteRecommendation(recommendationId : string): void;
};
