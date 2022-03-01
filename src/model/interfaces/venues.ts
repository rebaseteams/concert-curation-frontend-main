/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  GetVenueByIdResponse, GetVenueResponse,
} from '../types/service-response';
/* The repositories are supposed to implement this interface */
export interface VenuesInterface{
  getVenueById(id : string) : Promise<GetVenueByIdResponse>;
  getVenues(skip : number, limit : number) : Promise<GetVenueResponse>;
  getAllVenues() : Promise<GetVenueResponse>;
}
