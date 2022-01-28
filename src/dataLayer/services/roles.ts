import { RolesInterface } from '../../model/interfaces/roles';
import { CreateRoleForm, EditRoleForm } from '../../model/types/roles';
import {
  CreateRoleResponse,
  DeleteRoleResponse,
  EditRoleResponse,
  GetRoleByIdResponse,
  GetRolesCountResponse,
  GetRolesResponse,
} from '../../model/types/service-response';

export default class Roles implements RolesInterface {
    private rolesRepo: RolesInterface;

    constructor(rolesRepo: RolesInterface) {
      this.rolesRepo = rolesRepo;
    }

    createRole(createRoleData : CreateRoleForm): Promise<CreateRoleResponse> {
      return new Promise((resolve) => {
        this.rolesRepo.createRole(createRoleData).then((response) => {
          resolve(response);
        });
      });
    }

    getRoleById(RoleId: string): Promise<GetRoleByIdResponse> {
      return new Promise((resolve) => {
        this.rolesRepo.getRoleById(RoleId).then((response) => {
          resolve(response);
        });
      });
    }

    getRoles(skip: number, limit: number): Promise<GetRolesResponse> {
      return new Promise((resolve) => {
        this.rolesRepo.getRoles(skip, limit).then((response) => {
          resolve(response);
        });
      });
    }

    editRole(editRoleData: EditRoleForm): Promise<EditRoleResponse> {
      return new Promise((resolve) => {
        this.rolesRepo.editRole(editRoleData).then((response) => {
          resolve(response);
        });
      });
    }

    deleteRole(RoleId: string): Promise<DeleteRoleResponse> {
      return new Promise((resolve) => {
        this.rolesRepo.deleteRole(RoleId).then((response) => {
          resolve(response);
        });
      });
    }

    getRolesCount(): Promise<GetRolesCountResponse> {
      return new Promise((resolve) => {
        this.rolesRepo.getRolesCount().then((response) => {
          resolve(response);
        });
      });
    }
}
