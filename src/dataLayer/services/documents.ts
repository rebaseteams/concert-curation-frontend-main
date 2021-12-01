import DocumentsInterface from '../../model/interfaces/documents';
import { CreateDocumentForm } from '../../model/types/collaborationForm';
import {
  CreateDocumentResponse, GetDocumentsResponse,
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

    createDocument(collaborationFormValues: CreateDocumentForm):
      Promise<CreateDocumentResponse> {
      return new Promise((resolve) => {
        this.documentsRepo.createDocument(collaborationFormValues).then((val) => {
          resolve(val);
        });
      });
    }
}
