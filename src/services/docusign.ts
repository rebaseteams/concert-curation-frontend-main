/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import base64 from './base64.json';

import config from './config.json';

export type CreateEnvelope = {
  pdfBase64: string,
  emailSubject: string,
  fileName: string,
  fileExtension: string,
  documentId: string,
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
  documentId,
  recipients,
}: CreateEnvelope): Promise<any> => {
  const data = {
    emailSubject,
    documents: [
      {
        documentBase64: base64.pdf,
        name: fileName,
        fileExtension,
        documentId,
      },
    ],
    recipients: {
      carbonCopies: recipients.carbonCopies,
      signers: recipients.signers,
    },
    status: 'sent',
  };

  const response = await axios.post('http://localhost:4000/docusign', JSON.stringify(data));
  return response.data;
};

export { createEnvelope };
