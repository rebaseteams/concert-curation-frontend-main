/* eslint-disable max-len */

import { Modal } from 'antd';

const axiosErrorHandler = (err : {message : string, response : { data : { message : string }, status : number}}) : void => {
  if (err.response) {
    Modal.error({
      title: `Request Failed with status code : ${err.response.status}`,
      content: err.response.data.message,
    });
  } else {
    Modal.error({
      title: 'Error while sending request',
      content: err.message,
    });
  }
};

export default { axiosErrorHandler };
