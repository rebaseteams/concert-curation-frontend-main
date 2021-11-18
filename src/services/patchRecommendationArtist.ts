/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import config from './config.json';

const { baseURL } = config;

const patchRecommendationArtist = async (formId: string, discardedArtistId: string, userId: string): Promise<any> => {
  try {
    const response: any = await axios.patch(`${baseURL}/artists/recommendations/`, { formId, discardedArtistId, userId }, config.HEADER);
    return response.data;
  } catch (error) {
    const response = { error: true, error_message: error };
    return response;
  }
};

export default patchRecommendationArtist;
