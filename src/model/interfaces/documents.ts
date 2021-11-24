/* eslint-disable max-len */
/* eslint-disable semi */
import { CollaborationFormValues } from '../types/collaborationForm';
import { CollaborationFormResponse } from '../types/service-response';

export default interface DocumentsInterface {
  getHtmlTemplate (collaborationFormValues: CollaborationFormValues): Promise<CollaborationFormResponse>;
}
