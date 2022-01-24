import axios from 'axios';
import { RolesInterface } from '../../../model/interfaces/roles';
import { CreateRoleForm, EditRoleForm } from '../../../model/types/roles';
import {
  CreateRoleResponse, DeleteRoleResponse, EditRoleResponse, GetRoleByIdResponse, GetRolesResponse,
} from '../../../model/types/service-response';
import customErrorHandler from '../../../utils/customErrorHandler';

export default class RolesRepo implements RolesInterface {
    rolesUri: string;

    constructor(server: string) {
      this.rolesUri = `${server}/roles`;
    }

    createRole = async (
      createRoleData : CreateRoleForm,
    ): Promise<CreateRoleResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.post(`${this.rolesUri}/`, createRoleData).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    getRoleById = async (
      RoleId : string,
    ): Promise<GetRoleByIdResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.rolesUri}/${RoleId}`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    getRoles = async (
      skip: number,
      limit: number,
    ): Promise<GetRolesResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.rolesUri}/${skip}/${limit}`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    editRole = async (
      editRoleData: EditRoleForm,
    ): Promise<EditRoleResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.patch(`${this.rolesUri}`, editRoleData).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    deleteRole = async (
      RoleId: string,
    ): Promise<DeleteRoleResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.delete(`${this.rolesUri}/${RoleId}`).then((response: any) => {
        resolve({
          success: true,
          data: response.data.data,
        });
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })
}
