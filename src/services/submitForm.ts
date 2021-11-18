/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';

import config from './config.json';

const { baseURL } = config;

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

export type QuestionsFormDataInterface = {
  userId: string;
  concertName: string;
  eventType: string;
  venue: Array<string>;
  artistBudget:{'min': number, 'max':number};
  sponsorshipType :string;
  wantedBrands: Array<Brand>;
  unwantedBrands: Array<Brand>;
  targetAudience: TargetAudience;
  whatSellsMost: WhatSellsMost;
}

export const returnMockData = {
  id: '5c11fc81-38fa-4e19-b91b-6ea71b10d4e2',
  concertName: 'Friday Night Rock',
  status: 'pending',
  dateCreated: '',
};

export type ConcertCreationResponse = {
  id: string;
  concertName: string;
  status: boolean;
  dateCreated: string;
}

const submitQuestionsForm = async (data: QuestionsFormDataInterface | any): Promise<any> => {
  try {
    const response = await axios.post(`${baseURL}/artists/concert`, data, config.HEADER);
    // eslint-disable-next-line no-console
    console.log(response.data);
    return (response.data);

    // For now Returning mock data
    return {
      ...data,
      _id: String(Math.random() * 7676763),
    };
  } catch (error) {
    return { error: true, message: error };
  }
};

export default submitQuestionsForm;
