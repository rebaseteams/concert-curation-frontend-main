import axios from 'axios';
import AdvancedSearchInterface from '../../../model/interfaces/advancedSearch';
import { AdvancedSearchQuery } from '../../../model/types/advancedSearch';
import { AdvancedSearchResponse } from '../../../model/types/service-response';

import customErrorHandler from '../../../utils/customErrorHandler';

export default class AdvacedSearchRepo implements AdvancedSearchInterface {
    Uri: string;

    constructor(server: string) {
      this.Uri = `${server}/search`;
    }

    get = async (
      query: AdvancedSearchQuery,
    ): Promise<AdvancedSearchResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.Uri}`, { params: query }).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })
}
