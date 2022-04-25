import { GenresInterface } from '../../model/interfaces/genres';
import { GetAllGenresListResponse } from '../../model/types/service-response';

export default class Genres implements GenresInterface {
    private repo: GenresInterface;

    constructor(repo: GenresInterface) {
      this.repo = repo;
    }

    getAll() : Promise<GetAllGenresListResponse> {
      return new Promise((resolve) => {
        this.repo.getAll().then((response) => {
          resolve(response);
        });
      });
    }
}
