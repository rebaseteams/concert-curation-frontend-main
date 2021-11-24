import DocumentsInterface from '../../model/interfaces/documents';
import { CollaborationFormValues } from '../../model/types/collaborationForm';
import {
  CollaborationFormResponse,
} from '../../model/types/service-response';

export default class Documents implements DocumentsInterface {
    private documentsRepo : DocumentsInterface;

    constructor(documentsRepo : DocumentsInterface) {
      this.documentsRepo = documentsRepo;
    }

    getHtmlTemplate(collaborationFormValues: CollaborationFormValues):
      Promise<CollaborationFormResponse> {
      return new Promise((resolve) => {
        this.documentsRepo.getHtmlTemplate(collaborationFormValues).then((val) => {
          resolve(val);
        });
      });
    }
}
