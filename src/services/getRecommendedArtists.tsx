/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import config from './config.json';

import { recommendedArtistsMockData } from './recomendedArtistsMockData';

const { baseURL } = config;

const getRecommendedArtists = async (formId: string): Promise<any> => {
  try {
    const response: any = await axios.get(`${baseURL}/artists/recommendations/${formId}`);
    return response.data;
  } catch (error) {
    const response = { error: true, error_message: error };
  }

  // For now we are returning mock data
  // Later we will uncomment the abouve code when backend is set
  return recommendedArtistsMockData;
};

export default getRecommendedArtists;
