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

export type RoleResponseData = {
    id: string,
    name: string,
    // eslint-disable-next-line camelcase
    resources: ResourceActions,
  }

export type Action = {
    name: string;
    permission: boolean;
  }

export type Resource = {
    id: string;
    name: string;
    actions: Array<Action>
  }

export type Role = {
    id: string;
    name: string;
    resource: Array<Resource>;
  }

export type UserRoleType = {
    roles: Array<Role>
  };
