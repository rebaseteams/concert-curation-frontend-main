/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseURL = 'http://localhost:4000';

async function getRecomendedArtists(data: any) {
  const response = await axios.post(`${baseURL}/recommender/api/getMatchData/`, data);
  return response.data;
}

export default getRecomendedArtists;
