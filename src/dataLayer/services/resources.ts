import { ResourcesInterface } from '../../model/interfaces/resources';
import { CreateResourceForm, EditResourceForm } from '../../model/types/resources';
import {
  CreateResourceResponse,
  DeleteResourceResponse,
  EditResourceResponse,
  GetResourceByIdResponse,
  GetResourcesCountResponse,
  GetResourcesResponse,
} from '../../model/types/service-response';

export default class Resources implements ResourcesInterface {
    private resourcesRepo: ResourcesInterface;

    constructor(resourcesRepo: ResourcesInterface) {
      this.resourcesRepo = resourcesRepo;
    }

    createResource(createResourceData : CreateResourceForm): Promise<CreateResourceResponse> {
      return new Promise((resolve) => {
        this.resourcesRepo.createResource(createResourceData).then((response) => {
          resolve(response);
        });
      });
    }

    getResourceById(ResourceId: string): Promise<GetResourceByIdResponse> {
      return new Promise((resolve) => {
        this.resourcesRepo.getResourceById(ResourceId).then((response) => {
          resolve(response);
        });
      });
    }

    getResources(skip: number, limit: number): Promise<GetResourcesResponse> {
      return new Promise((resolve) => {
        this.resourcesRepo.getResources(skip, limit).then((response) => {
          resolve(response);
        });
      });
    }

    editResource(editResourceData: EditResourceForm): Promise<EditResourceResponse> {
      return new Promise((resolve) => {
        this.resourcesRepo.editResource(editResourceData).then((response) => {
          resolve(response);
        });
      });
    }

    deleteResource(ResourceId: string): Promise<DeleteResourceResponse> {
      return new Promise((resolve) => {
        this.resourcesRepo.deleteResource(ResourceId).then((response) => {
          resolve(response);
        });
      });
    }

    getResourcesCount(): Promise<GetResourcesCountResponse> {
      return new Promise((resolve) => {
        this.resourcesRepo.getResourcesCount().then((response) => {
          resolve(response);
        });
      });
    }
}
