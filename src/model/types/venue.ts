import { Address } from './address';

export type Venue = {
    name : string;
    id : string;
    address? : Address;
    venueCapacity? : number;
    matchPercentage?: number;
}
