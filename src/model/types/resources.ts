export type CreateResourceForm = {
    name: string,
    actions: Array<ActionsData>,
  };

export type EditResourceForm = {
      id: string,
      name: string,
      actions: Array<ActionsData>
  }

export type NewResourceResponseData = {
    id: string,
    name: string,
    actions: Array<ActionsData>
  }

export type ActionsData = { id: string, name: string }
