/* eslint-disable @typescript-eslint/no-explicit-any */
type ActionData = {
  name: string,
  id: string,
}

type GetActionsResponse = {
  success: boolean,
  data : {
    actions: Array<ActionData>
  }
}

export interface ActionsInterface {
  createActions: () => Promise<any>;
  getActions: () => Promise<GetActionsResponse>
}
