/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import axios from 'axios';
import config from './config.json';

const { baseURL } = config;

async function userRecommendationChoice(userID: string, discardedArtistList: any[], artistList: any[]): Promise<any> {
  try {
    await axios.patch(`${baseURL}/recommender/api/userRecommendationChoice/`, { userID, discardedArtistList, artistList });
  } catch (error) {
    const response = { error: true, error_message: error };
  }

  return true;
}

export default userRecommendationChoice;
