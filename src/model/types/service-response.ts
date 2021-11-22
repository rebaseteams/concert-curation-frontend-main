import { ConcertCreationResponse } from './questions';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ServiceResponse = {
  error: boolean,
  message: string,
  data?: Array<ConcertCreationResponse>,
  status?: number | string;
}
