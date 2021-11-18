/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import config from './config.json';

const { baseURL } = config;

const deleteConcertForm = async (formId: string): Promise<any> => {
  try {
    const response: any = await axios.delete(`${baseURL}/artists/concert/${formId}`);
    return response.data;
  } catch (error) {
    const response = { error: true, error_message: error };
    return response;
  }
};

export default deleteConcertForm;
