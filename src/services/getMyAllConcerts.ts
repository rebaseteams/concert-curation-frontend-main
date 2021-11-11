/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import config from './config.json';

const { baseURL } = config;

async function getMyAllConcerts(userId: string): Promise<any> {
  // TODO: allConcerts should extracted using userId
  try {
    const response: any = await axios.get(`${baseURL}/artists/concerts/`);
    return response.data;
  } catch (error) {
    return { error: true, message: error };
  }
}

export default getMyAllConcerts;
