/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import axios from 'axios';
import AuthInterface from '../../../model/interfaces/auth';
import { SignUp } from '../../../model/types/signup';
import { PROD_SERVER } from '../../../config';

export default class AuthRepo implements AuthInterface {
  signUp = async (data : SignUp) : Promise<{success : boolean}> => {
    return new Promise((resolve) => {
      axios.post(`${PROD_SERVER}/users`, {
        email: data.email,
        password: data.password,
        name: data.userName,
        role: data.role,
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
