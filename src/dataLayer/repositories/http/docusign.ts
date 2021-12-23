/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { PROD_SERVER } from '../../../config';
import { DocusignInterface } from '../../../model/interfaces/docusign';
import { CreateEnvelopeResponse } from '../../../model/types/docusign/apiResponses';
import { CatchError } from '../../../model/types/service-response';

const server = PROD_SERVER;

const DOCUSIGN_URI = `${server}/docusign`;

export default class DocusignRepo implements DocusignInterface {
  createEnvelope = async (envelopeData: any):
  Promise<CreateEnvelopeResponse> => new Promise((resolve) => {
    axios.post(DOCUSIGN_URI, JSON.stringify(envelopeData)).then((res) => {
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
