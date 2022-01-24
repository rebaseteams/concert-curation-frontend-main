/* eslint-disable max-len */

import { Modal } from 'antd';

const axiosErrorHandler = (err : {response : { data : { message : string }, status : number}}) : void => {
  Modal.error({
    title: `Request Failed with status code : ${err.response.status}`,
    content: err.response.data.message,
  });
};

export default { axiosErrorHandler };
