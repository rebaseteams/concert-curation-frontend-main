/* eslint-disable max-len */

import { notification } from 'antd';

const axiosErrorHandler = (err : {message : string, response : { data : { message : string }, status : number}}) : void => {
  if (err.response) {
    notification.error(
      {
        message: `Request Failed with status code : ${err.response.status}`,
        description: err.response.data.message,
      },
    );
  } else {
    notification.error(
      {
        message: 'Error while sending request',
        description: err.message,
      },
    );
  }
};

export default { axiosErrorHandler };
