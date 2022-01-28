export type CreateUserForm = {
  name: string,
  email: string,
  password: string,
  role: string,
};

export type NewUserResponseData = {
    id: string,
    name: string,
    email: string,
    approved: boolean,
    roles: Array<string>,
}

export type ApproveUserForm = {
    id: string,
    approval: boolean,
}

export type UpdateUsersRoleForm = {
    id: string,
    roles: Array<string>,
}

export type GetUsersCountQuery = {
    getPending: boolean | undefined,
}
