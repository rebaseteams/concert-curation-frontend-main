import axios from 'axios';
import { PROD_SERVER } from '../../../config';
import DocumentsInterface from '../../../model/interfaces/documents';
import { CreateDocumentForm } from '../../../model/types/collaborationForm';
import {
  CatchError,
  CreateDocumentResponse,
  DeleteDocumentResponse,
  EditDocumentsResponse,
  GetDocumentResponse,
  GetDocumentsResponse,
} from '../../../model/types/service-response';

const server = PROD_SERVER;

const DOCUMENTS_URI = `${server}/artists/recommendations/documents`;

export default class DocumentsRepo implements DocumentsInterface {
  getDocuments = async (): Promise<GetDocumentsResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.get(DOCUMENTS_URI).then((response: any) => {
      if (response.status !== 200) {
        resolve({ error: true, message: response.statusText, status: response.status });
      }
      resolve({ error: false, message: response.statusText, data: response.data });
    }).catch((err: CatchError) => {
      resolve({ error: true, message: err.message, status: err.status });
    });
  });

  getDocument = async (documentId: string):
  Promise<GetDocumentResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.get(`${DOCUMENTS_URI}/${documentId}`).then((response: any) => {
      if (response.status !== 200) {
        resolve({ error: true, message: response.statusText, status: response.status });
      }
      resolve({ error: false, message: response.statusText, data: response.data });
    }).catch((err: CatchError) => {
      resolve({ error: true, message: err.message, status: err.status });
    });
  });

  createDocument = async (collaborationFormValues: CreateDocumentForm):
    Promise<CreateDocumentResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.post(DOCUMENTS_URI, collaborationFormValues).then((val: any) => {
      if (val.status !== 200) {
        resolve({ error: true, message: val.statusText, status: val.status });
      }
      resolve({
        error: false, message: val.statusText, data: val.data, status: val.status,
      });
    }).catch((err: CatchError) => {
      resolve({ error: true, message: err.message, status: err.status });
    });
  })

  deleteDocument = async (documentId: string):
  Promise<DeleteDocumentResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.delete(`${DOCUMENTS_URI}/${documentId}`).then((response: any) => {
      if (response.status !== 200) {
        resolve({ error: true, message: response.statusText, status: response.status });
      }
      resolve({
        error: false, message: response.statusText, data: response.data, status: response.status,
      });
    }).catch((err: CatchError) => {
      resolve({ error: true, message: err.message, status: err.status });
    });
  })

  editDocument = async (documentId: string, html: string):
  Promise<EditDocumentsResponse> => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.patch(`${DOCUMENTS_URI}/${documentId}`, { html }).then((response: any) => {
      if (response.status !== 200) {
        resolve({ error: true, message: response.statusText, status: response.status });
      }
      resolve({
        error: false, message: response.statusText, data: response.data, status: response.status,
      });
    }).catch((err: CatchError) => {
      resolve({ error: true, message: err.message, status: err.status });
    });
  })
}
