/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { UsersInterface } from '../../../model/interfaces/users';
import {
  getUserByIdResponse,
  CreateUserResponse,
  getUsersResponse,
  getPendingUsersResponse,
  approveUserResponse,
  updateUsersRoleResponse,
  deleteUserResponse,
} from '../../../model/types/service-response';
import { ApproveUserForm, CreateUserForm, UpdateUsersRoleForm } from '../../../model/types/users';
import customErrorHandler from '../../../utils/customErrorHandler';

export default class UsersRepo implements UsersInterface {
    usersUri: string;

    constructor(server: string) {
      this.usersUri = `${server}/users`;
    }

    createUser = async (
      createUserData : CreateUserForm,
    ): Promise<CreateUserResponse> => new Promise((resolve) => {
      axios.post(`${this.usersUri}/`, createUserData).then((response : any) => {
        resolve(response.data);
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    getUserById = async (
      userId: string,
    ): Promise<getUserByIdResponse> => new Promise((resolve) => {
      axios.get(`${this.usersUri}/${userId}`).then((response: any) => {
        resolve(response.data);
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    getUsers = async (
      skip: number,
      limit: number,
    ): Promise<getUsersResponse> => new Promise((resolve) => {
      axios.get(`${this.usersUri}/${skip}/${limit}`).then((response: any) => {
        resolve(response.data);
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    getPendingUsers = async (
      skip:number,
      limit:number,
    ): Promise<getPendingUsersResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.usersUri}/pending/${skip}/${limit}`).then((response: any) => {
        resolve(response.data);
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    approveUser = async (
      approveUserData: ApproveUserForm,
    ): Promise<approveUserResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.patch(`${this.usersUri}/approval`, approveUserData).then((response: any) => {
        resolve(response.data);
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    updateUsersRole = async (
      updateUsersRoleData: UpdateUsersRoleForm,
    ): Promise<updateUsersRoleResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.patch(`${this.usersUri}/roles`, updateUsersRoleData).then((response: any) => {
        resolve(response.data);
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })

    deleteUser = async (
      userId: string,
    ): Promise<deleteUserResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.delete(`${this.usersUri}/${userId}`).then((response: any) => {
        resolve(response.data);
      }).catch((err) => {
        customErrorHandler.axiosErrorHandler(err);
      });
    })
}
