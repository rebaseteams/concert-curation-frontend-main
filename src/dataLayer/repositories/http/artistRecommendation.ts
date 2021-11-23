/* eslint-disable no-console */
import axios from 'axios';
import ArtistRecommendationInterface from '../../../model/interfaces/artistRecommendation';
import config from '../../../config';
import { PatchRequest } from '../../../model/types/patch-request';
import { QuestionsUI } from '../../../model/types/questions';
import {
  CatchError, DeleteRecommendationResponse, GetRecommendationResponse, ServiceResponse,
} from '../../../model/types/service-response';

const server = config.PROD_SERVER;
export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  addNewRecommendation = async (concertData : QuestionsUI) => {
    const resp = await axios.post(`${server}/api/artists/concert`, concertData);
    console.log('add new recommendation : ', resp);
  };

  getAllRecommendations = async (): Promise<ServiceResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.get(`${server}/api/artists/recommendations/`).then((val: any) => {
      if (val.status !== 200) {
        resolve({ error: true, status: val.status, message: val.message });
      }
      resolve({ error: false, data: val.data, message: 'success' });
    }).catch((err: CatchError) => {
      resolve({ error: true, status: err.status, message: err.message });
    });
  });

  getRecommendation = async (recommendationId : string):
    Promise<GetRecommendationResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.get(`${server}/api/artists/recommendations/${recommendationId}`).then((val: any) => {
      if (val.status !== 200) {
        resolve({ error: true, status: val.status, message: val.message });
      }
      resolve({ error: false, data: val.data.data, message: 'success' });
    }).catch((err: CatchError) => {
      resolve({ error: true, status: err.status, message: err.message });
    });
  })

  discardArtist = async (data : PatchRequest) => {
    const resp = await axios.patch(`${server}/api/artists/recommendations`, data);
    console.log('discard artist : ', resp);
  };

  deleteRecommendation = async (recommendationId : string):
    Promise<DeleteRecommendationResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.delete(`${server}/api/artists/recommendations/${recommendationId}`).then((val: any) => {
      if (val.status !== 200) {
        resolve({ error: true, status: val.status, message: val.statusText });
      }
      resolve({ error: false, data: val.data, message: 'ok' });
    }).catch((err: CatchError) => {
      resolve({ error: true, status: err.status, message: err.message });
    });
  });
}
