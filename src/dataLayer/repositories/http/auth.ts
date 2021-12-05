/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import axios from 'axios';
import { config } from '../../../config';
import AuthInterface from '../../../model/interfaces/auth';
import { SignUp } from '../../../model/types/signup';

export default class AuthRepo implements AuthInterface {
  signUp = async (data : SignUp) : Promise<{success : boolean}> => {
    return new Promise((resolve) => {
      axios.post(`${config.constants.AUTH_DOMAIN}/dbconnections/signup`, {
        client_id: config.constants.AUTH_CLIENT_ID,
        email: data.email,
        password: data.password,
        connection: config.constants.AUTH_CONNECTION,
        username: data.userName,
      }).then((value) => {
        console.log(value.data);
        if (value.status === 200) resolve({ success: true });
        resolve({ success: false });
      }).catch((err) => {
        console.log(err);
        resolve({ success: false });
      });
    });
  };
}
