import axios from 'axios';
import { SendGridEmailData } from '../model/types/sendGridEmailData';
import { CatchError, SendNotificationResponse } from '../model/types/service-response';

import config from '../services/config.json';

const baseUrl = config.baseURL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendNotification = async (data: SendGridEmailData):
Promise<SendNotificationResponse> => new Promise((resolve) => {
  axios.post(`${baseUrl}/notification`, data).then((response) => {
    if (response.status !== 200) {
      resolve({ error: true, message: response.statusText, status: response.status });
    }
    resolve({
      error: false,
      message: response.statusText,
      status: response.status,
      data: response.data,
    });
  }).catch((err: CatchError) => {
    resolve({ error: true, message: err.message, status: err.status });
  });
});

export default sendNotification;
