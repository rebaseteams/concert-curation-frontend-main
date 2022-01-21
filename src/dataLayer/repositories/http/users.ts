import axios from 'axios';
import { UsersInterface } from '../../../model/interfaces/users';
import {
  CatchError,
  getUserByIdResponse,
  CreateUserResponse,
  getUsersResponse,
  getPendingUsersResponse,
  approveUserResponse,
  updateUsersRoleResponse,
  deleteUserResponse,
} from '../../../model/types/service-response';
import { ApproveUserForm, CreateUserForm, UpdateUsersRoleForm } from '../../../model/types/users';

export default class UsersRepo implements UsersInterface {
    usersUri: string;

    constructor(server: string) {
      this.usersUri = `${server}/users`;
    }

    createUser = async (
      createUserData : CreateUserForm,
    ): Promise<CreateUserResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.post(`${this.usersUri}/`, createUserData).then((response: any) => {
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

    getUserById = async (
      userId: string,
    ): Promise<getUserByIdResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.usersUri}/${userId}`).then((response: any) => {
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

    getUsers = async (
      skip: number,
      limit: number,
    ): Promise<getUsersResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.usersUri}/${skip}/${limit}`).then((response: any) => {
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

    getPendingUsers = async (
      skip:number,
      limit:number,
    ): Promise<getPendingUsersResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.get(`${this.usersUri}/pending/${skip}/${limit}`).then((response: any) => {
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

    approveUser = async (
      approveUserData: ApproveUserForm,
    ): Promise<approveUserResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.patch(`${this.usersUri}/approval`, approveUserData).then((response: any) => {
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

    updateUsersRole = async (
      updateUsersRoleData: UpdateUsersRoleForm,
    ): Promise<updateUsersRoleResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.patch(`${this.usersUri}/roles`, updateUsersRoleData).then((response: any) => {
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

    deleteUser = async (
      userId: string,
    ): Promise<deleteUserResponse> => new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.delete(`${this.usersUri}/${userId}`).then((response: any) => {
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
