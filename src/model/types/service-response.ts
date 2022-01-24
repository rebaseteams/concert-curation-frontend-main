/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArtistNew } from './artist';
import { ArtistRecommendation } from './artist-recommendation';
import { CreateCollaborationResponseData } from './collaborationForm';
import { Documents } from './document/addDocument';
import { ConcertCreationResponse } from './questions';
import { NewResourceResponseData } from './resources';
import { NewRoleResponseData } from './roles';
import { TemplateResponse, Templates } from './templates';
import { NewUserResponseData } from './users';

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
  error: boolean,
  message: string,
  data?: {
    success: boolean,
    data : {
        user : NewUserResponseData,
    }
  },
  status?: number | string;
}

export type getUserByIdResponse = {
  error: boolean,
  message: string,
  data?: {
    success: boolean,
    data: NewUserResponseData
  },
  status?: number | string;
}

export type getUsersResponse = {
  error: boolean,
  message: string,
  data?: {
    success: boolean,
    data: {
      users: Array<NewUserResponseData>
    }
  },
  status?: number | string;
}

export type getPendingUsersResponse = {
  error: boolean,
  message: string,
  data?: {
    success: boolean,
    data: {
      users: Array<NewUserResponseData>
    }
  },
  status?: number | string;
}

export type approveUserResponse = {
  error: boolean,
  message: string,
  data?: { success: boolean },
  status?: number | string;
}

export type updateUsersRoleResponse = {
  error: boolean,
  message: string,
  data?: { success: boolean },
  status?: number | string;
}

export type deleteUserResponse = {
  error: boolean,
  message: string,
  data?: { success: boolean },
  status?: number | string;
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
  data : any
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
    roles: Array<NewRoleResponseData>
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
