export type ResourceActions = Array<{
    id : string,
    name : string,
    actions : Array<{
      name:string,
      permission:boolean
    }>
  }>;
