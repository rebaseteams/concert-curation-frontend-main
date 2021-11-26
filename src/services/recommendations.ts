/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as _ from 'lodash';
import { QuestionsUI } from '../model/types/questions';

import config from './config.json';

const { baseURL } = config;

export const getMyAllConcerts = async (userId: string): Promise<any> => {
  // TODO: allConcerts should extracted using userId
  try {
    const response: AxiosResponse<unknown, any> = await axios.get(`${baseURL}/artists/recommendations/`);
    if (response.status !== 200) {
      return { error: true, status: response.status, message: 'unknown error' };
    }
    return { error: false, data: response.data, message: 'success' };
  } catch (error: AxiosError | unknown | any) {
    return { error: true, status: 501, message: 'Unknown' };
  }
};

export const getRecommendedArtists = async (formId: string): Promise<any> => {
  try {
    const response: any = await axios.get(`${baseURL}/artists/recommendations/${formId}`);
    return response.data;
  } catch (error: any) {
    return { data: { success: false, error: error.message } };
  }
};

export const submitQuestionsForm = async (questions: QuestionsUI): Promise<any> => {
  // Insuring data should not have any other fields exept specified below
  const data = _.pick(questions, ['userId',
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
  try {
    const response = await axios.post(`${baseURL}/artists/recommendations`, data);
    if (response.status === 200) {
      return { error: false, data: response.data };
    }
    return { error: true, message: response.statusText, status: response.status };
  } catch (error) {
    return { error: true, message: error, status: 500 };
  }
};

export const deleteRecommendation = async (formId: string): Promise<any> => {
  try {
    const response = await axios.delete(`${baseURL}/artists/recommendations/${formId}`);
    if (response.status === 200) {
      return { error: false, data: response.data };
    }
    return { error: true, message: response.statusText, status: response.status };
  } catch (error) {
    const response = { error: true, message: error, status: 500 };
    return response;
  }
};
