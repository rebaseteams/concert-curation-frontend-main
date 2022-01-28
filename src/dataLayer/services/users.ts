import { UsersInterface } from '../../model/interfaces/users';
import {
  approveUserResponse,
  CreateUserResponse,
  deleteUserResponse,
  getPendingUsersResponse,
  getUserByIdResponse,
  GetUsersCountResponse,
  getUserRolesResponse,
  getUsersResponse,
  updateUsersRoleResponse,
} from '../../model/types/service-response';
import {
  ApproveUserForm, CreateUserForm, GetUsersCountQuery, UpdateUsersRoleForm,
} from '../../model/types/users';

export default class Users implements UsersInterface {
    private usersRepo: UsersInterface;

    constructor(usersRepo: UsersInterface) {
      this.usersRepo = usersRepo;
    }

    createUser(createUserData : CreateUserForm): Promise<CreateUserResponse> {
      return new Promise((resolve) => {
        this.usersRepo.createUser(createUserData).then((response) => {
          resolve(response);
        });
      });
    }

    getUserById(userId: string): Promise<getUserByIdResponse> {
      return new Promise((resolve) => {
        this.usersRepo.getUserById(userId).then((response) => {
          resolve(response);
        });
      });
    }

    getUsers(skip: number, limit: number): Promise<getUsersResponse> {
      return new Promise((resolve) => {
        this.usersRepo.getUsers(skip, limit).then((response) => {
          resolve(response);
        });
      });
    }

    getPendingUsers(skip: number, limit: number): Promise<getPendingUsersResponse> {
      return new Promise((resolve) => {
        this.usersRepo.getPendingUsers(skip, limit).then((response) => {
          resolve(response);
        });
      });
    }

    approveUser(approveUserData: ApproveUserForm): Promise<approveUserResponse> {
      return new Promise((resolve) => {
        this.usersRepo.approveUser(approveUserData).then((response) => {
          resolve(response);
        });
      });
    }

    updateUsersRole(updateUsersRoleData: UpdateUsersRoleForm): Promise<updateUsersRoleResponse> {
      return new Promise((resolve) => {
        this.usersRepo.updateUsersRole(updateUsersRoleData).then((response) => {
          resolve(response);
        });
      });
    }

    deleteUser(userId: string): Promise<deleteUserResponse> {
      return new Promise((resolve) => {
        this.usersRepo.deleteUser(userId).then((response) => {
          resolve(response);
        });
      });
    }

    getUsersCount(query: GetUsersCountQuery): Promise<GetUsersCountResponse> {
      return new Promise((resolve) => {
        this.usersRepo.getUsersCount(query).then((response) => {
          resolve(response);
        });
      });
    }

    getUserRoles(): Promise<getUserRolesResponse> {
      return new Promise((resolve) => {
        this.usersRepo.getUserRoles().then((response) => {
          resolve(response);
        });
      });
    }
}
