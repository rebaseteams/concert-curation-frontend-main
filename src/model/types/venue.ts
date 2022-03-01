import { Address } from './address';

export type Venue = {
    name : string;
    id : string;
    address? : Address;
    venueCapacity? : number;
    matchPercentage?: number;
}

export type NewVenueResponseData = {
    id : string;
    name : string;
    address? : Address;
    bowieVenueId: string;
    url: string;
    lat: string;
    long: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    comments?: string;
    lastUpdatedBy?: string;
    lastUpdatedAt?: string;
    capacity? : number;
}
