/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { GetEventsTypeByIdResponse, GetEventsTypeResponse } from '../types/service-response';
/* The repositories are supposed to implement this interface */
export interface EventsTypeInterface{
    getById(id : string) : Promise<GetEventsTypeByIdResponse>;
    get(skip : number, limit : number) : Promise<GetEventsTypeResponse>;
    getAll() : Promise<GetEventsTypeResponse>;
  }
