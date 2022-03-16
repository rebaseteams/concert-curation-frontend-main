/* eslint-disable max-len */
import * as _ from 'lodash';
import { ResourceActions } from '../model/types/resource-actions';
import { NewResourceResponseData } from '../model/types/resources';

type Item = {
  id: string;
  name: string;
}

export type roleList = {id: string, name : string, resource : Array<{id: string, permission : boolean, name : string, actions : string}>};

export function rolesFieldMapper(
  rdata: NewResourceResponseData[] | undefined,
  resource: ResourceActions, item: Item,
): roleList {
  const resArr = resource.map((o) => o.actions.map((a) => ({
    id: o.id,
    name: rdata?.find((r) => r.id === o.id)?.id || 'res-name',
    permission: a.permission,
    actions: a.id,
  })));
  const oneD = _.flatten(resArr);
  return {
    id: item.id,
    name: item.name,
    resource: oneD,
  };
}
