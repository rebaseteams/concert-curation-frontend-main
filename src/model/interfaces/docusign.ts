import {
  CreateEnvelopeResponse, GetenvelopesResponse, UpdateResponse,
} from '../types/docusign/apiResponses';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DocusignInterface {
  createEnvelope (envelopeData: any, documentId: string): Promise<CreateEnvelopeResponse>,
  getEnvelopes: () => Promise<GetenvelopesResponse>
  updateStatus: (envelopeId: string, documentId: string) => Promise<UpdateResponse>
}
