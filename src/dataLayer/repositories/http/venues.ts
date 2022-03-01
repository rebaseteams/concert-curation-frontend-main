import axios from 'axios';
import { VenuesInterface } from '../../../model/interfaces/venues';
import {
  GetVenueByIdResponse, GetVenueResponse,
} from '../../../model/types/service-response';
import customErrorHandler from '../../../utils/customErrorHandler';

export default class VenuesRepo implements VenuesInterface {
    venuesUri: string;

    constructor(server: string) {
      this.venuesUri = `${server}/venues`;
    }

    getVenueById = async (
      venueId : string,
    ): Promise<GetVenueByIdResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.venuesUri}/${venueId}`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    getVenues = async (
      skip: number,
      limit: number,
    ): Promise<GetVenueResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.venuesUri}/${skip}/${limit}`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    getAllVenues = async (): Promise<GetVenueResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.venuesUri}/count`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })
}
