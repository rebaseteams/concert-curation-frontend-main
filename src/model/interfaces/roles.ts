import { CreateRoleForm, EditRoleForm } from '../types/roles';
import {
  CreateRoleResponse, DeleteRoleResponse, EditRoleResponse, GetRoleByIdResponse, GetRolesResponse,
} from '../types/service-response';

export interface RolesInterface{
    createRole (createRoleData : CreateRoleForm) : Promise<CreateRoleResponse>;
    getRoleById (RoleId : string) : Promise<GetRoleByIdResponse>;
    getRoles (skip: number, limit: number) : Promise<GetRolesResponse>;
    editRole (editRoleData: EditRoleForm) : Promise<EditRoleResponse>;
    deleteRole (RoleId : string) : Promise<DeleteRoleResponse>;
}
