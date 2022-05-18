/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrandsInterface } from '../../../model/interfaces/brands';
import { GetAllBrandsListResponse, GetBrandResponse } from '../../../model/types/service-response';
import { brandMockDataNew, allBrandsMockData } from './mockData/brands';

export default class BrandsRepo implements BrandsInterface {
  // eslint-disable-next-line class-methods-use-this
  getAll(): Promise<GetAllBrandsListResponse> {
    return new Promise((resolve) => {
      resolve({
        success: true,
        data: {
          brands: allBrandsMockData,
        },
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getById(id: string): Promise<GetBrandResponse> {
    return new Promise((resolve) => {
      resolve({
        success: true,
        data: brandMockDataNew,
      });
    });
  }
}
