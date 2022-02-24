import { ActionsInterface } from '../model/interfaces/actions';
import { RolesInterface } from '../model/interfaces/roles';
import { UsersInterface } from '../model/interfaces/users';
import { setSsd } from './systemSpecificDataManager';

export async function systemSpecificDataGetter(
  userService: UsersInterface, actionsService: ActionsInterface, rolesService: RolesInterface,
): Promise<void> {
  const roles = await userService.getUserRoles();
  if (roles.success) setSsd('roles', roles.data);

  const actions = await actionsService.getActions();
  if (actions.success) setSsd('actions', actions.data.actions);

  const allRoles = await rolesService.getRoles(0, 200);
  if (allRoles.success) setSsd('allRoles', allRoles.data.roles);
}
