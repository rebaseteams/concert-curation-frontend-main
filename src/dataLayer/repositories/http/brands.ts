import axios from 'axios';
import { BrandsInterface } from '../../../model/interfaces/brands';
import { GetAllBrandsListResponse } from '../../../model/types/service-response';

import customErrorHandler from '../../../utils/customErrorHandler';

export default class BrandsRepo implements BrandsInterface {
    Uri: string;

    constructor(server: string) {
      this.Uri = `${server}/brands`;
    }

    getAll = async (): Promise<GetAllBrandsListResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.Uri}/`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })
}
