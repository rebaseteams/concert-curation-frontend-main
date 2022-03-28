/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';
import { getSsd } from './systemSpecificDataManager';

const checkResourceAction = (resource: string, action : string, component : JSX.Element)
: JSX.Element | null => {
  const roles: any = getSsd('roles');
  if (!roles) return null;
  if (!_.has(roles, resource)) return null;
  if (roles[resource][action] && roles[resource][action] === true) return component;
  return null;
};

export default checkResourceAction;
