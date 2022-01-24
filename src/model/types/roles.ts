import { ResourceActions } from './resource-actions';

export type CreateRoleForm = {
    name: string,
    resourceActions: ResourceActions,
  };

export type EditRoleForm = {
    id: string,
    name: string,
    resourceActions: ResourceActions,
  }

export type NewRoleResponseData = {
    id: string,
    name: string,
    // eslint-disable-next-line camelcase
    resource_actions: ResourceActions,
  }
