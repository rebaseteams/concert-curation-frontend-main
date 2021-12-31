/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import services from '../visualLayer/services';
import { config } from '../config.dev';
import base64 from './base64.json';
import { CreateEnvelopeResponse } from '../model/types/docusign/apiResponses';

export type CreateEnvelope = {
  pdfBase64: string,
  emailSubject: string,
  fileName: string,
  fileExtension: string,
  pdfId: string,
  recipients: {
    carbonCopies: Array<{
      email: string,
      name: string,
      recipientId: string,
      routingOrder: string,
    }>,
    signers: Array<{
      email: string,
      name: string,
      recipientId: string | '1',
      routingOrder: string | '1',
      tabs: {
          signHereTabs: Array<{
            anchorString: '**signature_1**' | '/sn1/' | '**signature**' | '/sn/',
            anchorUnits: 'pixels',
            anchorXOffset: '20' | '30' | '40',
            anchorYOffset: '10' | '20' | '30',
          }>
      }
    }>
  }
}

const createEnvelope = async ({
  pdfBase64,
  emailSubject,
  fileName,
  fileExtension,
  pdfId,
  recipients,
}: CreateEnvelope, documentId: string): Promise<CreateEnvelopeResponse> => {
  const data = {
    emailSubject,
    documents: [
      {
        documentBase64: base64.pdf,
        name: fileName,
        fileExtension,
        documentId: pdfId,
      },
    ],
    recipients: {
      carbonCopies: recipients.carbonCopies,
      signers: recipients.signers,
    },
    status: 'sent',
  };

  const response = await config.services.docusignService.createEnvelope(data, documentId);
  return response.data;
};

export { createEnvelope };
