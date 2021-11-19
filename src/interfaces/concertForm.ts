import {
  ArtistBudget, Brand, TargetAudience, WhatSellsMost,
} from './concertDataResponse';

export type onSubmitFormDataType = {
  age: Array<string>;
  artistBudget: undefined;
  concertName: string;
  eventType: string;
  gender: Array<string>;
  genre: Array<string>;
  sponsorshipType: string;
  unwantedBrands: Array<string>;
  venue: Array<string>;
  wantedBrands: Array<string>;
}

export type QuestionsFormDataInterface = {
  userId: string;
  concertName: string;
  eventType: string;
  venue: Array<string>;
  artistBudget: ArtistBudget;
  sponsorshipType :string;
  wantedBrands: Array<Brand>;
  unwantedBrands: Array<Brand>;
  targetAudience: TargetAudience;
  whatSellsMost: WhatSellsMost;
}

export type ConcertsListData = {
  id: string;
  concertName: string;
  dateCreated: string;
  status: boolean;
}
