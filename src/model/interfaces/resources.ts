import { CreateResourceForm, EditResourceForm } from '../types/resources';
import {
  CreateResourceResponse,
  DeleteResourceResponse,
  EditResourceResponse,
  GetResourceByIdResponse,
  GetResourcesResponse,
} from '../types/service-response';

export interface ResourcesInterface{
    createResource (createResourceData : CreateResourceForm) : Promise<CreateResourceResponse>;
    getResourceById (ResourceId : string) : Promise<GetResourceByIdResponse>;
    getResources (skip: number, limit: number) : Promise<GetResourcesResponse>;
    editResource (editResourceData: EditResourceForm) : Promise<EditResourceResponse>;
    deleteResource (ResourceId : string) : Promise<DeleteResourceResponse>;
}
