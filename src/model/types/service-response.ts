/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdvancedSearchResponseData } from './advancedSearch';
import { ArtistNew } from './artist';
import { ArtistRecommendation } from './artist-recommendation';
import { NewBrandResponse } from './brand';
import { AllBrandsList } from './brands';
import { CreateCollaborationResponseData } from './collaborationForm';
import { Documents } from './document/addDocument';
import { NewEventsTypeResponseData } from './eventsType';
import { AllGenresList } from './genre';
import { ConcertCreationResponse } from './questions';
import { NewResourceResponseData } from './resources';
import {
  NewRoleResponseData, Resource, RoleResponseData, UserRoleType,
} from './roles';
import { TemplateResponse, Templates } from './templates';
import { NewUserResponseData } from './users';
import { NewVenueResponseData } from './venue';

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

export type EditDocumentsResponse = {
  error: boolean,
  message: string,
  data?: { success: boolean },
  status?: number | string;
}

type DocumentData = {
  id: string,
  name: string,
  createdOn: string,
  recommendationId: string,
  html: string
  mode: DocumentModes,
  contract: DocumentContractData,
}

export type DocumentModes = 'edit' | 'submit' | 'sign';

export type DocumentContractData = {
  envelopeId: string,
  url: string,
  dateCreated: string,
  signDate: string,
  status: string,
}

export type GetDocumentResponse = {
  error: boolean,
  message: string,
  data?: {
    success: true,
    data: DocumentData
  },
  status?: number | string;
}

export type GetDocumentsForRecommendationResponse = {
  error: boolean,
  message: string,
  data?: {
    success: true,
    data: Array<DocumentData>
  },
  status?: number | string;
}

export type ShareDocumentResponse = {
  error: boolean,
  message: string,
  data?: {
    success: true,
  },
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

// Artist Response
export type GetArtistResponse = {
  error: boolean,
  message: string,
  data?: ArtistNew,
  status?: number | string;
}
export type CatchError = { message: string, status: number }

// Users Response
export type CreateUserResponse = {
  success: boolean,
  data : {
    user : NewUserResponseData,
  }
}

export type getUserByIdResponse = {
  success: boolean,
  data: NewUserResponseData
}

export type getUsersResponse = {
  success: boolean,
  data: {
    users: Array<NewUserResponseData>
  }
}

export type getPendingUsersResponse = {
  success: boolean,
  data: {
    users: Array<NewUserResponseData>
  }
}

export type approveUserResponse = {
  success: boolean,
}

export type updateUsersRoleResponse = {
  success: boolean,
}

export type deleteUserResponse = {
  success: boolean,
}

export type GetUsersCountResponse = {
  success: boolean,
  data : {
    count: number
  }
}

export type getUserRolesResponse = {
  success: boolean,
  data: UserRoleType,
}

// Resource Response
export type CreateResourceResponse = {
  success: boolean,
  data : {
    resource : NewResourceResponseData,
  }
}

export type GetResourceByIdResponse = {
  success: boolean,
  data: NewResourceResponseData
}

export type GetResourcesResponse = {
  success: boolean,
  data: {
    resources: Array<NewResourceResponseData>
  }
}

export type DeleteResourceResponse = {
  success: boolean,
  data : any
}

export type EditResourceResponse = {
  success: boolean,
  data : { resource: Resource }
}

export type GetResourcesCountResponse = {
  success: boolean,
  data : {
    count: number
  }
}

// Roles Response
export type CreateRoleResponse = {
  success: boolean,
  data : {
      role : NewRoleResponseData,
  }
}

export type GetRoleByIdResponse = {
  success: boolean,
  data: NewRoleResponseData
}

export type GetRolesResponse = {
  success: boolean,
  data: {
    roles: Array<RoleResponseData>
  }
}

export type EditRoleResponse = {
  success: boolean,
  data : any
}

export type DeleteRoleResponse = {
  success: boolean,
  data : any
}

export type GetRolesCountResponse = {
  success: boolean,
  data : {
    count: number
  }
}

// venue response
export type GetVenueByIdResponse = {
  success: boolean,
  data: NewVenueResponseData
}

export type GetVenueResponse = {
  success: boolean,
  data: {
    venues : Array<NewVenueResponseData>
  }
}

// events type response
export type GetEventsTypeByIdResponse = {
  success: boolean,
  data: NewEventsTypeResponseData
}

export type GetEventsTypeResponse = {
  success: boolean,
  data: {
    eventsType : Array<NewEventsTypeResponseData>
  }
}

// brands response
export type GetAllBrandsListResponse = {
  success: boolean,
  data: {
    brands : Array<AllBrandsList>
  }
}

export type GetBrandResponse = {
  success: boolean,
  data: NewBrandResponse
}

// genres response
export type GetAllGenresListResponse = {
  success: boolean,
  data: {
    genres : Array<AllGenresList>
  }
}
// search response
export type AdvancedSearchResponse = {
  success: boolean,
  data: {
    results: AdvancedSearchResponseData
  }
}

// validateRecommendationFields response
export type ValidateRecommendationFieldsResponse = {
  success: boolean,
  data: {
    nameAvailable: boolean
  }
}
