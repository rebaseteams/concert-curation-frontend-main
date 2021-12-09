export interface Error {
  status: string | number | undefined;
  message: string | undefined;
}

export interface Notification {
  status: 'success' | 'error';
  message: string;
}
