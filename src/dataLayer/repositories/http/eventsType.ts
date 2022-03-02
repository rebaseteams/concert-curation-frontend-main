import axios from 'axios';
import { EventsTypeInterface } from '../../../model/interfaces/eventsType';
import { GetEventsTypeByIdResponse, GetEventsTypeResponse } from '../../../model/types/service-response';
import customErrorHandler from '../../../utils/customErrorHandler';

export default class EventsTypeRepo implements EventsTypeInterface {
    Uri: string;

    constructor(server: string) {
      this.Uri = `${server}/events-type`;
    }

    getById = async (
      id : string,
    ): Promise<GetEventsTypeByIdResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.Uri}/${id}`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    get = async (
      skip: number,
      limit: number,
    ): Promise<GetEventsTypeResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.Uri}/${skip}/${limit}`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    getAll = async (): Promise<GetEventsTypeResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.Uri}/`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })
}
