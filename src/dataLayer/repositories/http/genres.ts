import axios from 'axios';
import { GenresInterface } from '../../../model/interfaces/genres';
import { GetAllGenresListResponse } from '../../../model/types/service-response';

import customErrorHandler from '../../../utils/customErrorHandler';

export default class GenresRepo implements GenresInterface {
    Uri: string;

    constructor(server: string) {
      this.Uri = `${server}/genres`;
    }

    getAll = async (): Promise<GetAllGenresListResponse> => new Promise((resolve) => {
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
