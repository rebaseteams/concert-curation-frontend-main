/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { ActionsInterface } from '../../../model/interfaces/actions';
import customErrorHandler from '../../../utils/customErrorHandler';

export default class ActionsHttpRep implements ActionsInterface {
    private server: string;

    constructor(server: string) {
      this.server = server;
    }

  createActions = async (): Promise<any> => new Promise((resolve) => resolve('any'));

  getActions = async ():
  Promise<{
    success: boolean; data: { actions: { name: string; id: string; }[]
  }}> => new Promise((resolve) => {
    axios.get(this.server).then((res: any) => {
      resolve({ success: true, data: res.data.data });
    }).catch((err) => {
      customErrorHandler.axiosErrorHandler(err);
    });
  })
}
