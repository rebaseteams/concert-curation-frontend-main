import { DocusignInterface } from '../../model/interfaces/docusign';
import { CreateEnvelopeResponse, GetenvelopesResponse } from '../../model/types/docusign/apiResponses';

export default class DocusignService implements DocusignInterface {
  private docusignRepo: DocusignInterface;

  constructor(docusignRepo: DocusignInterface) {
    this.docusignRepo = docusignRepo;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createEnvelope = async (envelopeData: any, documentId: string):
  Promise<CreateEnvelopeResponse> => new Promise((resolve) => {
    resolve(this.docusignRepo.createEnvelope(envelopeData, documentId));
  })

  getEnvelopes = async ():
  Promise<GetenvelopesResponse> => new Promise((resolve) => {
    resolve(this.docusignRepo.getEnvelopes());
  })
}
