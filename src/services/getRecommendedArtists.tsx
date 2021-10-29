/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import config from './config.json';

import { recommendedArtistsMockData } from './recomendedArtistsMockData';

const { baseURL } = config;

async function getRecommendedArtists(formId: string): Promise<any> {
  try {
    const response = await axios.post(`${baseURL}/recommender/api/getMatchData/`, { formId });
  } catch (error) {
    const response = { error: true, error_message: error };
  }

  // For now we are returning mock data
  // Later we will uncomment the abouve code when backend is set
  return recommendedArtistsMockData;
}

export default getRecommendedArtists;
