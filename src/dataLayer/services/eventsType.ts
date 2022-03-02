import { EventsTypeInterface } from '../../model/interfaces/eventsType';
import { GetEventsTypeByIdResponse, GetEventsTypeResponse } from '../../model/types/service-response';

export default class EventsType implements EventsTypeInterface {
    private repo: EventsTypeInterface;

    constructor(repo: EventsTypeInterface) {
      this.repo = repo;
    }

    getById(id : string) : Promise<GetEventsTypeByIdResponse> {
      return new Promise((resolve) => {
        this.repo.getById(id).then((response) => {
          resolve(response);
        });
      });
    }

    get(skip : number, limit : number) : Promise<GetEventsTypeResponse> {
      return new Promise((resolve) => {
        this.repo.get(skip, limit).then((response) => {
          resolve(response);
        });
      });
    }

    getAll() : Promise<GetEventsTypeResponse> {
      return new Promise((resolve) => {
        this.repo.getAll().then((response) => {
          resolve(response);
        });
      });
    }
}
