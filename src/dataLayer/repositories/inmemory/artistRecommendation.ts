/* eslint-disable no-console */
import ArtistRecommendationInterface from '../../../model/interfaces/artistRecommendation';
import { ServiceResponse } from '../../../model/types/service-response';
import allConcertMockData from './allConcertMockData';

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

  getRecommendation = (recommendationId : string) => {
    console.log('get recommendation : ', recommendationId);
  };

  discardArtist = () => {
    console.log('discard artist');
  };

  deleteRecommendation = () => {
    console.log('delete recommendation');
  };
}
