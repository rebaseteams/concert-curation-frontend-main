/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { PatchRequest } from '../types/patch-request';
import { QuestionsUI } from '../types/questions';

export default interface ArtistRecommendationInterface {
  addNewRecommendation(concertData : QuestionsUI): void;
  getAllRecommendations(): void;
  getRecommendation(recommendationId : string): void;
  discardArtist(data : PatchRequest): void;
  deleteRecommendation(recommendationId : string): void;
};
