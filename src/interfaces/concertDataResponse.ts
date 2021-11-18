export type Brand = {
  brandName : string;
  brandId : string;
}

export type Genre = {
  genreId: string;
  genreName: string;
}

export type TargetAudience = {
  ageGroup: Array<string>;
  genre: Array<Genre>;
  gender: Array<string>;
}

export type WhatSellsMost = {
  beer:Array<Brand>;
  liquor: Array<Brand>;
  softDrinks: Array<Brand>;
}

export type ArtistBudget = {
  min: number;
  max: number;
}

export type SponsorshipType ='Brand awareness' | 'Direct sales' | 'Customer Engagement'

export type ConcertDataResponse = {
  id: string;
  userId: string;
  concertName: string;
  eventType: string;
  venue: Array<string>;
  artistBudget: ArtistBudget;
  sponsorshipType: SponsorshipType;
  wantedBrands: Array<Brand>;
  unwantedBrands: Array<Brand>;
  targetAudience: TargetAudience;
  whatSellsMost: WhatSellsMost;
  dateCreated: string;
}
