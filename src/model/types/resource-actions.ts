export type ResourceActions = Array<{
    id : string,
    name : string,
    actions : Array<{
      id:string,
      name?: string,
      permission:boolean
    }>
  }>;
