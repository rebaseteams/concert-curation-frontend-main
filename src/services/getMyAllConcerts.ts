/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';

import config from './config.json';

const { baseURL } = config;

const getMyAllConcerts = async (userId: string): Promise<any> => {
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

export default getMyAllConcerts;
