import AdvancedSearchInterface from '../../model/interfaces/advancedSearch';
import { AdvancedSearchQuery } from '../../model/types/advancedSearch';
import { AdvancedSearchResponse } from '../../model/types/service-response';

export default class AdvancedSearch implements AdvancedSearchInterface {
    private repo: AdvancedSearchInterface;

    constructor(repo: AdvancedSearchInterface) {
      this.repo = repo;
    }

    get(query: AdvancedSearchQuery) : Promise<AdvancedSearchResponse> {
      return new Promise((resolve) => {
        this.repo.get(query).then((response) => {
          resolve(response);
        });
      });
    }
}
