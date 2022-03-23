import { GetAllBrandsListResponse } from '../types/service-response';

export interface BrandsInterface{
    getAll() : Promise<GetAllBrandsListResponse>;
  }
