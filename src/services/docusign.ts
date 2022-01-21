export type CreateEnvelope = {
  html: string,
  emailSubject: string,
  fileName: string,
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
      htmlDefinition:
      {
          source: string
      },
      documentId: string,
      name: string
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
  html,
  emailSubject,
  fileName,
  recipients,
}: CreateEnvelope): EnvelopeData => {
  const data: EnvelopeData = {
    emailSubject,
    documents: [
      {
        htmlDefinition: {
          source: html,
        },
        documentId: '1',
        name: fileName,
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
