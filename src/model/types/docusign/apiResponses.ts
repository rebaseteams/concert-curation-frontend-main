/* eslint-disable @typescript-eslint/no-explicit-any */
export type CreateEnvelopeResponse = {
  error: boolean,
  message: string,
  data?: any,
  status?: number | string;
}

export type GetenvelopesResponse = {
  error: boolean,
  message: string,
  data?: any,
  status?: number | string;
}

export type UpdateResponse = {
  error: boolean,
  message: string,
  data?: any,
  status?: number | string;
}

export type GetSignedPdfRes = {
  error: boolean,
  message: string,
  data?: { success: boolean, data: string },
  status?: number | string;
}
