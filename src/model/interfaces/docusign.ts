import {
  CreateEnvelopeResponse, GetenvelopesResponse,
} from '../types/docusign/apiResponses';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DocusignInterface {
  createEnvelope (envelopeData: any, documentId: string): Promise<CreateEnvelopeResponse>,
  getEnvelopes: () => Promise<GetenvelopesResponse>
}
