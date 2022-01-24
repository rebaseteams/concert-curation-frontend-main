import axios from 'axios';
import { ResourcesInterface } from '../../../model/interfaces/resources';
import { CreateResourceForm, EditResourceForm } from '../../../model/types/resources';
import {
  CatchError,
  CreateResourceResponse,
  DeleteResourceResponse,
  EditResourceResponse,
  GetResourceByIdResponse,
  GetResourcesResponse,
} from '../../../model/types/service-response';

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
        if (response.status !== 200) {
          resolve({
            error: true,
            message: response.statusText,
            status: response.status,
          });
        }
        resolve({
          error: false,
          message: response.statusText,
          data: response.data.data,
        });
      }).catch((err: CatchError) => {
        resolve({ error: true, message: err.message, status: err.status });
      });
    })

    getResourceById = async (
      resourceId: string,
    ): Promise<GetResourceByIdResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.resourcesUri}/${resourceId}`).then((response: any) => {
        if (response.status !== 200) {
          resolve({
            error: true,
            message: response.statusText,
            status: response.status,
          });
        }
        resolve({
          error: false,
          message: response.statusText,
          data: response.data.data,
        });
      }).catch((err: CatchError) => {
        resolve({ error: true, message: err.message, status: err.status });
      });
    })

    getResources = async (
      skip: number,
      limit: number,
    ): Promise<GetResourcesResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.resourcesUri}/${skip}/${limit}`).then((response: any) => {
        if (response.status !== 200) {
          resolve({
            error: true,
            message: response.statusText,
            status: response.status,
          });
        }
        resolve({
          error: false,
          message: response.statusText,
          data: response.data.data,
        });
      }).catch((err: CatchError) => {
        resolve({ error: true, message: err.message, status: err.status });
      });
    })

    editResource = async (
      editResourceData: EditResourceForm,
    ): Promise<EditResourceResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.patch(`${this.resourcesUri}`, editResourceData).then((response: any) => {
        if (response.status !== 200) {
          resolve({
            error: true,
            message: response.statusText,
            status: response.status,
          });
        }
        resolve({
          error: false,
          message: response.statusText,
          data: response.data.data,
        });
      }).catch((err: CatchError) => {
        resolve({ error: true, message: err.message, status: err.status });
      });
    })

    deleteResource = async (
      ResourceId: string,
    ): Promise<DeleteResourceResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.delete(`${this.resourcesUri}/${ResourceId}`).then((response: any) => {
        if (response.status !== 200) {
          resolve({
            error: true,
            message: response.statusText,
            status: response.status,
          });
        }
        resolve({
          error: false,
          message: response.statusText,
          data: response.data.data,
        });
      }).catch((err: CatchError) => {
        resolve({ error: true, message: err.message, status: err.status });
      });
    })
}
