/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { BrandsInterface } from '../../../model/interfaces/brands';
import { GetAllBrandsListResponse, GetBrandResponse } from '../../../model/types/service-response';

import customErrorHandler from '../../../utils/customErrorHandler';

export default class BrandsRepo implements BrandsInterface {
  Uri: string;

  constructor(server: string) {
    this.Uri = `${server}/brands`;
  }

  getById = async (id: string): Promise<GetBrandResponse> => new Promise((resolve) => {
    axios.get(`${this.Uri}/${id}`).then((response: any) => {
      resolve({
        success: true,
        data: response.data.data,
      });
    }).catch((err) => {
      customErrorHandler.axiosErrorHandler(err);
    });
  })

  getAll = async (): Promise<GetAllBrandsListResponse> => new Promise((resolve) => {
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
