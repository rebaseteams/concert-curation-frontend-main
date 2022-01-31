/* eslint-disable max-len */

import _ from 'lodash';

/* eslint-disable @typescript-eslint/no-explicit-any */
const checkResourceAction = (resource : string, action : string, componemt : JSX.Element) : JSX.Element | null => {
  const item = localStorage.getItem('roles');
  if (item) {
    const rolesData = JSON.parse(item);
    const threeD = rolesData.roles.map((res: any) => res.resource.map((i: any) => i.actions.map((a: any) => ({
      resource: i.name,
      action: a.name,
      permission: a.permission,
    }))));
    const twoD = _.flatten(threeD);
    const oneD = _.flatten(twoD);
    const filter = oneD.filter((o: any) => o.resource === resource && o.action === action);
    if (filter.length !== 0) {
      const perm = filter.filter((p: any) => p.permission === false);
      if (perm.length !== 0) {
        return null;
      }
      return componemt;
    }
    return null;
  }
  return null;
};

export default checkResourceAction;
