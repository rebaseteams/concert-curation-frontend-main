import { VenuesInterface } from '../../model/interfaces/venues';
import {
  GetVenueByIdResponse, GetVenueResponse,
} from '../../model/types/service-response';

export default class Venues implements VenuesInterface {
    private venuesRepo: VenuesInterface;

    constructor(venuesRepo: VenuesInterface) {
      this.venuesRepo = venuesRepo;
    }

    getVenueById(venueId: string): Promise<GetVenueByIdResponse> {
      return new Promise((resolve) => {
        this.venuesRepo.getVenueById(venueId).then((response) => {
          resolve(response);
        });
      });
    }

    getVenues(skip: number, limit: number): Promise<GetVenueResponse> {
      return new Promise((resolve) => {
        this.venuesRepo.getVenues(skip, limit).then((response) => {
          resolve(response);
        });
      });
    }

    getAllVenues(): Promise<GetVenueResponse> {
      return new Promise((resolve) => {
        this.venuesRepo.getAllVenues().then((response) => {
          resolve(response);
        });
      });
    }
}
