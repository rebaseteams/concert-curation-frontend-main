/* eslint-disable no-console */
import axios from 'axios';
import ArtistRecommendationInterface from '../../../model/interfaces/artistRecommendation';
import config from '../../../config';
import { PatchRequest } from '../../../model/types/patch-request';
import { QuestionsUI } from '../../../model/types/questions';

const server = config.PROD_SERVER;
export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  addNewRecommendation = async (concertData : QuestionsUI) => {
    const resp = await axios.post(`${server}/api/artists/concert`, concertData);
    console.log('add new recommendation : ', resp);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllRecommendations = async (): Promise<any> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await axios.get(`${server}/api/artists/recommendations/`);
      if (response.status !== 200) {
        return { error: true, status: response.status, message: 'unknown error' };
      }
      return { error: false, data: response.data, message: 'success' };
    } catch (error) {
      return { error: true, status: 501, message: 'Unknown' };
    }
  };

  getRecommendation = async (recommendationId : string) => {
    const resp = await axios.get(`${server}/api/artists/recommendations/${recommendationId}`);
    console.log('get recommendation : ', resp);
  };

  discardArtist = async (data : PatchRequest) => {
    const resp = await axios.patch(`${server}/api/artists/recommendations`, data);
    console.log('discard artist : ', resp);
  };

  deleteRecommendation = async (recommendationId : string) => {
    const resp = await axios.delete(`${server}/api/artists/concert/${recommendationId}`);
    console.log('delete recommendation : ', resp);
  };
}
