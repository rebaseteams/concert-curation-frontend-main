export type ResourceActions = {
    resourceId : string,
    actions : Array<{
      name:string,
      permission:boolean
    }>
  };
