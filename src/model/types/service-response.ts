/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArtistRecommendation } from './artist-recommendation';
import { CreateCollaborationResponseData } from './collaborationForm';
import { Documents } from './document/addDocument';
import { ConcertCreationResponse } from './questions';
import { TemplateResponse, Templates } from './templates';

// Recommendations Response
export type GetAllRecommendationsResponse = {
  error: boolean,
  message: string,
  data: Array<ConcertCreationResponse>,
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

export type AddRecommendationResponse = {
  error: boolean,
  message: string,
  data?: ConcertCreationResponse,
  status?: number | string;
}

export type PatchRecommendationResponse = {
  error: boolean,
  message: string,
  data?: { success: boolean },
  status?: number | string;
}

// Documents response
export type DocumentsResponseData = {
  success: boolean,
  data: Array<Documents>
}

export type GetDocumentsResponse = {
  error: boolean,
  message: string,
  data?: DocumentsResponseData,
  status?: number | string,
}

export type CreateDocumentResponse = {
  error: boolean,
  message: string,
  data?: CreateCollaborationResponseData,
  status?: number | string;
}

export type DeleteDocumentResponse = {
  error: boolean,
  message: string,
  data?: { success: boolean },
  status?: number | string;
}

// Notifications Response
export type SendNotificationResponse = {
  error: boolean,
  message: string,
  data?: any,
  status?: number | string;
}

// Templates Response
export type GetTemplatesResponse = {
  error: boolean,
  message: string,
  data?: {
    success: boolean,
    data: Array<Templates>,
  },
  status?: number | string;
}

export type GetTemplateResponse = {
  error: boolean,
  message: string,
  data?: TemplateResponse,
  status?: number | string;
}

export type CatchError = { message: string, status: number }
