/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import config from './config.json';

const { baseURL } = config;

async function deleteConcertForm(formId: string): Promise<any> {
  try {
    const response: any = await axios.delete(`${baseURL}/artists/concert/${formId}`);
    return response.data;
  } catch (error) {
    const response = { error: true, error_message: error };
    return response;
  }
}

export default deleteConcertForm;
