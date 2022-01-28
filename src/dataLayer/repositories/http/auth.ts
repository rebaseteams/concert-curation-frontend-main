/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import axios from 'axios';
import AuthInterface from '../../../model/interfaces/auth';
import { SignUp } from '../../../model/types/signup';
import customErrorHandler from '../../../utils/customErrorHandler';

export default class AuthRepo implements AuthInterface {
  server: string;

  constructor(server: string) {
    this.server = server;
  }

  signUp = async (data : SignUp) : Promise<{success : boolean, data : unknown}> => {
    return new Promise((resolve) => {
      axios.post(`${this.server}/users`, {
        email: data.email,
        password: data.password,
        name: data.userName,
        role: data.role,
      }).then((value) => {
        resolve({ success: true, data: value.data });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    });
  };
}
