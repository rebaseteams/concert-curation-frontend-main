/* eslint-disable no-console */
import axios from 'axios';
import * as _ from 'lodash';
import ArtistRecommendationInterface from '../../../model/interfaces/artistRecommendation';
import { config } from '../../../config';
import { PatchRequest } from '../../../model/types/patch-request';
import { QuestionsUI } from '../../../model/types/questions';
import {
  AddRecommendationResponse,
  CatchError,
  DeleteRecommendationResponse,
  GetAllRecommendationsResponse,
  GetRecommendationResponse,
  PatchRecommendationResponse,
} from '../../../model/types/service-response';

const server = config.constants.PROD_SERVER;
export default class ArtistRecommendationRepo implements ArtistRecommendationInterface {
  addNewRecommendation = async (concertData : QuestionsUI): Promise<AddRecommendationResponse> => {
    const data = _.pick(concertData, ['userId',
      'concertName',
      'eventType',
      'venue',
      'artistBudget',
      'sponsorshipType',
      'wantedBrands',
      'unwantedBrands',
      'targetAudience',
      'whatSellsMost',
    ]);
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.post(`${server}/artists/recommendations`, data).then((val: any) => {
        if (val.status !== 200) {
          resolve({ error: true, status: val.status, message: val.statusText });
        }
        resolve({ error: false, data: val.data, message: 'success' });
      }).catch((err: CatchError) => {
        resolve({ error: true, status: err.status, message: err.message });
      });
    });
  };

  getAllRecommendations = async ():
    Promise<GetAllRecommendationsResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.get(`${server}/artists/recommendations/`).then((val: any) => {
      if (val.status !== 200) {
        resolve({
          error: true, data: [], status: val.status, message: val.message,
        });
      }
      resolve({ error: false, data: val.data, message: 'success' });
    }).catch((err: CatchError) => {
      resolve({
        error: true, data: [], status: err.status, message: err.message,
      });
    });
  });

  getRecommendation = async (recommendationId : string):
    Promise<GetRecommendationResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.get(`${server}/artists/recommendations/${recommendationId}`).then((val: any) => {
      if (val.status !== 200) {
        resolve({ error: true, status: val.status, message: val.message });
      }
      resolve({ error: false, data: val.data.data, message: 'success' });
    }).catch((err: CatchError) => {
      resolve({ error: true, status: err.status, message: err.message });
    });
  })

  discardArtist = async (data : PatchRequest):
    Promise<PatchRecommendationResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.patch(`${server}/artists/recommendations/`, data).then((val:any) => {
      if (val.status !== 200) {
        resolve({ error: true, status: val.status, message: val.statusText });
      }
      resolve({ error: false, data: val.data, message: val.statusText });
    }).catch((err: CatchError) => {
      resolve({ error: true, status: err.status, message: err.message });
    });
  });

  deleteRecommendation = async (recommendationId : string):
    Promise<DeleteRecommendationResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.delete(`${server}/artists/recommendations/${recommendationId}`).then((val: any) => {
      if (val.status !== 200) {
        resolve({ error: true, status: val.status, message: val.statusText });
      }
      resolve({ error: false, data: val.data, message: 'ok' });
    }).catch((err: CatchError) => {
      resolve({ error: true, status: err.status, message: err.message });
    });
  });
}
