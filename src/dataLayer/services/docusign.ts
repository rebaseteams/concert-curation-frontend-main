import { DocusignInterface } from '../../model/interfaces/docusign';
import {
  CreateEnvelopeResponse, GetenvelopesResponse, GetSignedPdfRes, UpdateResponse,
} from '../../model/types/docusign/apiResponses';

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

  updateStatus = async (envelopeId: string, documentId: string):
   Promise<UpdateResponse> => new Promise((resolve) => {
    resolve(this.docusignRepo.updateStatus(envelopeId, documentId));
  });

  getSignedPdf = async (envelopeId: string):
  Promise<GetSignedPdfRes> => new Promise((resolve) => {
    resolve(this.docusignRepo.getSignedPdf(envelopeId));
  });
}
