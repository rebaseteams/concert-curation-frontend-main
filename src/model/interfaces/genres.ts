import { GetAllGenresListResponse } from '../types/service-response';

export interface GenresInterface{
    getAll() : Promise<GetAllGenresListResponse>;
  }
