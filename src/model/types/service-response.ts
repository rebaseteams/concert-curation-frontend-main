import { ArtistRecommendation } from './artist-recommendation';
import { CollaborationFormValues } from './collaborationForm';
import { ConcertCreationResponse } from './questions';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ServiceResponse = {
  error: boolean,
  message: string,
  data?: Array<ConcertCreationResponse>,
  status?: number | string;
}

export type GetRecommendationResponse = {
  error: boolean,
  message: string,
  data?: ArtistRecommendation,
  status?: number | string;
}

export type AfterDeleteRecommendation = {
  formId: string,
  success: boolean,
}

export type DeleteRecommendationResponse = {
  error: boolean,
  message: string,
  data?: AfterDeleteRecommendation,
  status?: number | string;
}

export type CollaborationFormResponse = {
  error: boolean,
  message: string,
  data?: CollaborationFormValues,
  status?: number | string;
}

export type CatchError = { message: string, status: number }
