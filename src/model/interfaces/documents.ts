/* eslint-disable max-len */
/* eslint-disable semi */
import { CreateDocumentForm } from '../types/collaborationForm';
import { CreateDocumentResponse, GetDocumentsResponse } from '../types/service-response';

export default interface DocumentsInterface {
  createDocument (createDocumentForm: CreateDocumentForm): Promise<CreateDocumentResponse>;
  getDocuments (): Promise<GetDocumentsResponse>;
}
