import { BrandsInterface } from '../../model/interfaces/brands';
import { GetAllBrandsListResponse } from '../../model/types/service-response';

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
}
