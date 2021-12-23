import { CreateEnvelopeResponse } from '../types/docusign/apiResponses';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DocusignInterface {
  createEnvelope (envelopeData: any): Promise<CreateEnvelopeResponse>
}
