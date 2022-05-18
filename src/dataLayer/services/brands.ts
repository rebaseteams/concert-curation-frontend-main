import { BrandsInterface } from '../../model/interfaces/brands';
import { GetAllBrandsListResponse, GetBrandResponse } from '../../model/types/service-response';

export default class Brands implements BrandsInterface {
    private repo: BrandsInterface;

    constructor(repo: BrandsInterface) {
      this.repo = repo;
    }

    getAll() : Promise<GetAllBrandsListResponse> {
      return new Promise((resolve) => {
        this.repo.getAll().then((response) => {
          resolve(response);
        });
      });
    }

    getById(id: string): Promise<GetBrandResponse> {
      return new Promise((resolve) => {
        this.repo.getById(id).then((response) => {
          resolve(response);
        });
      });
    }
}
