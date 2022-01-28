import {
  approveUserResponse,
  CreateUserResponse,
  deleteUserResponse,
  getPendingUsersResponse,
  getUserByIdResponse,
  GetUsersCountResponse,
  getUsersResponse,
  updateUsersRoleResponse,
} from '../types/service-response';
import {
  ApproveUserForm, CreateUserForm, GetUsersCountQuery, UpdateUsersRoleForm,
} from '../types/users';

export interface UsersInterface {
    createUser (createUserData : CreateUserForm) : Promise<CreateUserResponse>;
    getUserById (userId: string,) : Promise<getUserByIdResponse>;
    getUsers (skip: number, limit: number,) : Promise<getUsersResponse>;
    getPendingUsers (skip: number, limit: number,) : Promise<getPendingUsersResponse>;
    approveUser (approveUserData: ApproveUserForm) : Promise<approveUserResponse>;
    updateUsersRole (updateUsersRoleData: UpdateUsersRoleForm,) : Promise<updateUsersRoleResponse>;
    deleteUser (userId: string,) : Promise<deleteUserResponse>;
    getUsersCount(query: GetUsersCountQuery,) : Promise<GetUsersCountResponse>;

}
