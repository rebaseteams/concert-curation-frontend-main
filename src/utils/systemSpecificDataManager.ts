/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
type SsdKeys = 'actions' | 'allRoles' | 'roles' | 'expireIn' | 'unapproved';

export function setSsd(name: SsdKeys, value: any): void {
  const ssd = localStorage.getItem('ssd');
  const ssdObj = ssd ? JSON.parse(ssd) : {};
  ssdObj[name] = value;
  localStorage.setItem('ssd', JSON.stringify(ssdObj));
}

export function getSsd(name: SsdKeys): any {
  const ssd = localStorage.getItem('ssd');
  const ssdObj = ssd ? JSON.parse(ssd) : {};
  if (ssdObj[name]) return ssdObj[name];
  return null;
}

export function removeSsd(name: SsdKeys): void {
  const ssd = localStorage.getItem('ssd');
  const ssdObj = ssd ? JSON.parse(ssd) : {};
  if (ssdObj[name]) delete ssdObj[name];
  localStorage.setItem('ssd', JSON.stringify(ssdObj));
}
