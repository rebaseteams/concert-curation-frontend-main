export type CreateEnvelope = {
  pdfBase64: HTMLElement | string,
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

type EnvelopeData = {
  emailSubject: string;
  documents: Array<{
    documentBase64: HTMLElement | string;
    name: string;
    fileExtension: string;
    documentId: string;
  }>;
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
  },
  status: 'sent',
}

const createEnvelope = ({
  pdfBase64,
  emailSubject,
  fileName,
  fileExtension,
  pdfId,
  recipients,
}: CreateEnvelope): EnvelopeData => {
  const data: EnvelopeData = {
    emailSubject,
    documents: [
      {
        documentBase64: pdfBase64,
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

  return data;
};

export { createEnvelope };
