/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
type SsdKeys = 'actions' | 'allRoles' | 'roles' | 'expireIn'

export function setSsd(name: SsdKeys, value: any): void {
  const ssv = localStorage.getItem('ssv');
  const ssvObj = ssv ? JSON.parse(ssv) : {};
  ssvObj[name] = value;
  localStorage.setItem('ssv', JSON.stringify(ssvObj));
}

export function getSsd(name: SsdKeys): any {
  const ssv = localStorage.getItem('ssv');
  const ssvObj = ssv ? JSON.parse(ssv) : {};
  if (ssvObj[name]) return ssvObj[name];
  return null;
}

export function removeSsd(name: SsdKeys): void {
  const ssv = localStorage.getItem('ssv');
  const ssvObj = ssv ? JSON.parse(ssv) : {};
  if (ssvObj[name]) delete ssvObj[name];
  localStorage.setItem('ssv', JSON.stringify(ssvObj));
}
