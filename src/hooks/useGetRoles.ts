import { useState } from 'react';
import { RolesInterface } from '../model/interfaces/roles';
import { NewRoleResponseData } from '../model/types/roles';

export type GetRoles = {
  roles: Array<NewRoleResponseData>;
  getRoles: () => void;
}

export function useGetRoles(rolesService: RolesInterface): GetRoles {
  const [roles, setRoles] = useState<Array<NewRoleResponseData>>([]);

  const getRoles = async () => {
    // TODO: Should first get the count of roles and use that as limit
    const response = await rolesService.getRoles(0, 100);
    if (response.success) {
      setRoles(response.data.roles);
    }
  };

  return {
    roles,
    getRoles,
  };
}
