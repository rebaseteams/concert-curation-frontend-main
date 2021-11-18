/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import config from './config.json';

import { recommendedArtistsMockData } from './recomendedArtistsMockData';

const { baseURL } = config;

const getRecommendedArtists = async (formId: string): Promise<any> => {
  try {
    const response: any = await axios.get(`${baseURL}/artists/recommendations/${formId}`, config.HEADER);
    return response.data;
  } catch (error: any) {
    return { data: { success: false, error: error.message } };
  }
};

export default getRecommendedArtists;
