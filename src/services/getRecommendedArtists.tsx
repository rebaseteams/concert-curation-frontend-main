/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';

import config from '../configs/config.json';

// const { baseURL } = config;

import { recommendedArtistsMockData } from './recomendedArtistsMockData';

async function getRecommendedArtists(formId: string): Promise<any> {
  // try {
  //   const response = await axios.post(`${baseURL}/recommender/api/getMatchData/`, { formId });
  // } catch (error) {
  //   const response = { error: true, error_message: error };
  // }
  // return response.data;

  // For now we are returning mock data
  // Later we will uncomment the abouve code when backend is set
  return recommendedArtistsMockData;
}

export default getRecommendedArtists;
