/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { PROD_SERVER } from '../../../config';
import { DocusignInterface } from '../../../model/interfaces/docusign';
import { CreateEnvelopeResponse, GetenvelopesResponse } from '../../../model/types/docusign/apiResponses';
import { CatchError } from '../../../model/types/service-response';

const server = PROD_SERVER;

const DOCUSIGN_URI = `${server}/artists/recommendations/documents/docusign`;

export default class DocusignRepo implements DocusignInterface {
  getEnvelopes = async (): Promise<GetenvelopesResponse> => new Promise((resolve) => {
    axios.get(DOCUSIGN_URI).then((res) => {
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
    axios.post(`${DOCUSIGN_URI}/${documentId}`, envelopeData).then((res) => {
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
