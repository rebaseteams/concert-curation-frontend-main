/* eslint-disable no-console */
import ArtistRecommendationInterface from '../../../model/interfaces/artistRecommendation';

export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  addNewRecommendation = () => {
    console.log('add new recommendation');
  };

  getAllRecommendations = () => {
    console.log('get all recommendations');
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
