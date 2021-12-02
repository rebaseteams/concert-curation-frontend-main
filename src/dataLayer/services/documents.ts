import DocumentsInterface from '../../model/interfaces/documents';
import { CreateDocumentForm } from '../../model/types/collaborationForm';
import {
  CreateDocumentResponse, DeleteDocumentResponse, GetDocumentResponse, GetDocumentsResponse,
} from '../../model/types/service-response';

export default class Documents implements DocumentsInterface {
    private documentsRepo : DocumentsInterface;

    constructor(documentsRepo : DocumentsInterface) {
      this.documentsRepo = documentsRepo;
    }

    getDocuments(): Promise<GetDocumentsResponse> {
      return new Promise((resolve) => {
        this.documentsRepo.getDocuments().then((val) => {
          resolve(val);
        });
      });
    }

    getDocument(documentId: string): Promise<GetDocumentResponse> {
      return new Promise((resolve) => {
        this.documentsRepo.getDocument(documentId).then((val) => {
          resolve(val);
        });
      });
    }

    createDocument(collaborationFormValues: CreateDocumentForm):
      Promise<CreateDocumentResponse> {
      return new Promise((resolve) => {
        this.documentsRepo.createDocument(collaborationFormValues).then((val) => {
          resolve(val);
        });
      });
    }

    deleteDocument(documentId: string):
      Promise<DeleteDocumentResponse> {
      return new Promise((resolve) => {
        this.documentsRepo.deleteDocument(documentId).then((val) => {
          resolve(val);
        });
      });
    }

    editDocument(documentId: string, html: string):
      Promise<DeleteDocumentResponse> {
      return new Promise((resolve) => {
        this.documentsRepo.editDocument(documentId, html).then((val) => {
          resolve(val);
        });
      });
    }
}
