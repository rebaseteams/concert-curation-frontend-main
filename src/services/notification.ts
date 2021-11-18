import axios from 'axios';
import { SendGridEmailData } from '../components/sendEamilForm/utils';

import config from './config.json';

const baseUrl = config.baseURL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendNotification = async (data: SendGridEmailData): Promise<any> => {
  try {
    const response = await axios.post(`${baseUrl}/notification`, data);
    return response.data;
  } catch (err) {
    return (err);
  }
};

export default sendNotification;
