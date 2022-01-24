import axios from 'axios';
import { ResourcesInterface } from '../../../model/interfaces/resources';
import { CreateResourceForm, EditResourceForm } from '../../../model/types/resources';
import {
  CreateResourceResponse,
  DeleteResourceResponse,
  EditResourceResponse,
  GetResourceByIdResponse,
  GetResourcesResponse,
} from '../../../model/types/service-response';
import customErrorHandler from '../../../utils/customErrorHandler';

export default class ResourcesRepo implements ResourcesInterface {
    resourcesUri: string;

    constructor(server: string) {
      this.resourcesUri = `${server}/resources`;
    }

    createResource = async (
      createResourceData : CreateResourceForm,
    ): Promise<CreateResourceResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.post(`${this.resourcesUri}/`, createResourceData).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    getResourceById = async (
      resourceId: string,
    ): Promise<GetResourceByIdResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.resourcesUri}/${resourceId}`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    getResources = async (
      skip: number,
      limit: number,
    ): Promise<GetResourcesResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.resourcesUri}/${skip}/${limit}`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    editResource = async (
      editResourceData: EditResourceForm,
    ): Promise<EditResourceResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.patch(`${this.resourcesUri}`, editResourceData).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    deleteResource = async (
      ResourceId: string,
    ): Promise<DeleteResourceResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.delete(`${this.resourcesUri}/${ResourceId}`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })
}
