/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import axios from 'axios';
import config from '../../../config';
import DocumentsInterface from '../../../model/interfaces/documents';
import { CollaborationFormValues } from '../../../model/types/collaborationForm';
import { CatchError, CollaborationFormResponse } from '../../../model/types/service-response';

const server = config.PROD_SERVER;

export default class DocumentsRepo implements DocumentsInterface {
  getHtmlTemplate = async (collaborationFormValues: CollaborationFormValues):
    Promise<CollaborationFormResponse> => {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.post(`${server}/artists/recommendations/documents`, collaborationFormValues).then((val: any) => {
        if (val.status !== 200) {
          resolve({ error: true, message: val.statusText, status: val.status });
        }
        resolve({
          error: false, message: val.statusText, data: val.data, status: val.status,
        });
      }).catch((err: CatchError) => {
        resolve({ error: true, message: err.message, status: err.status });
      });
    });
  }
}
