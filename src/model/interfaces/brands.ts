import { GetAllBrandsListResponse, GetBrandResponse } from '../types/service-response';

export interface BrandsInterface{
    getAll() : Promise<GetAllBrandsListResponse>;
    getById(id: string) : Promise<GetBrandResponse>;
  }
