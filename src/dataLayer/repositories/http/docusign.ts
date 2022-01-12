/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { DocusignInterface } from '../../../model/interfaces/docusign';
import {
  CreateEnvelopeResponse, GetenvelopesResponse, GetSignedPdfRes, UpdateResponse,
} from '../../../model/types/docusign/apiResponses';
import { CatchError } from '../../../model/types/service-response';

export default class DocusignRepo implements DocusignInterface {
  docusignUri: string;

  constructor(server: string) {
    this.docusignUri = `${server}/artists/recommendations/documents/docusign`;
  }

  getEnvelopes = async (): Promise<GetenvelopesResponse> => new Promise((resolve) => {
    axios.get(this.docusignUri).then((res) => {
      if (res.status !== 200) {
        resolve({ error: true, message: res.statusText, status: res.status });
      }
      resolve({
        error: false,
        message: res.statusText,
        status: res.status,
        data: res.data,
      });
    });
  });

  createEnvelope = async (envelopeData: any, documentId: string):
  Promise<CreateEnvelopeResponse> => new Promise((resolve) => {
    axios.post(`${this.docusignUri}/${documentId}`, envelopeData).then((res) => {
      if (res.status !== 200) {
        resolve({ error: true, message: res.statusText, status: res.status });
      }
      resolve({
        error: false,
        message: res.statusText,
        status: res.status,
        data: res.data,
      });
    }).catch((err: CatchError) => {
      resolve({
        error: true,
        message: err.message,
        status: err.status,
      });
    });
  })

  updateStatus = async (envelopeId: string, documentId: string):
    Promise<UpdateResponse> => new Promise((resolve) => {
    axios.get(`${this.docusignUri}/${documentId}/${envelopeId}`).then((res) => {
      if (res.status !== 200) {
        resolve({ error: true, message: res.statusText, status: res.status });
      }
      resolve({
        error: false,
        message: res.statusText,
        status: res.status,
        data: res.data,
      });
    }).catch((err: CatchError) => {
      resolve({
        error: true,
        message: err.message,
        status: err.status,
      });
    });
  })

  getSignedPdf = async (envelopeId: string):
  Promise<GetSignedPdfRes> => new Promise((resolve) => {
    axios.get(`${this.docusignUri}/${envelopeId}`).then((res: any) => {
      if (res.status !== 200) {
        resolve({ error: true, message: res.statusText, status: res.status });
      }
      resolve({
        error: false,
        message: res.statusText,
        status: res.status,
        data: res.data,
      });
    }).catch((err: CatchError) => {
      resolve({
        error: true,
        message: err.message,
        status: err.status,
      });
    });
  })
}
