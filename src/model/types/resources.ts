export type CreateResourceForm = {
    name: string,
    actions: Array<string>,
  };

export type EditResourceForm = {
      id: string,
      name: string,
      actions: Array<string>
  }

export type NewResourceResponseData = {
    id: string,
    name: string,
    actions: Array<string>
  }
