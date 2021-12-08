/* eslint-disable max-len */
/* eslint-disable semi */
import { CreateDocumentForm } from '../types/collaborationForm';
import {
  CreateDocumentResponse,
  DeleteDocumentResponse,
  EditDocumentsResponse,
  GetDocumentResponse,
  GetDocumentsResponse,
} from '../types/service-response';

export interface DocumentsInterface {
  createDocument (createDocumentForm: CreateDocumentForm): Promise<CreateDocumentResponse>;
  getDocuments (): Promise<GetDocumentsResponse>;
  deleteDocument (documentId: string): Promise<DeleteDocumentResponse>;
  editDocument (documentId: string, html: string): Promise<EditDocumentsResponse>;
  getDocument (documentId: string): Promise<GetDocumentResponse>;
}
