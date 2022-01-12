/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import axios from 'axios';
import { TemplatesInterface } from '../../../model/interfaces/templates';
import { CatchError, GetTemplateResponse, GetTemplatesResponse } from '../../../model/types/service-response';

export default class TemplatesRepo implements TemplatesInterface {
  server: string;

  constructor(server:string) {
    this.server = server;
  }

  getTemplates = async (): Promise<GetTemplatesResponse> => {
    return new Promise((resolve) => {
      axios.get(`${this.server}/artists/recommendations/documents/templates`).then((response: any) => {
        if (response.status !== 200) {
          resolve({ error: true, message: response.statusText, status: response.status });
        }
        resolve({
          error: false,
          message: response.statusText,
          status: response.status,
          data: response.data,
        });
      }).catch((err: CatchError) => {
        resolve({ error: true, message: err.message, status: err.status });
      });
    });
  }

  getTemplate = async (templateId: string): Promise<GetTemplateResponse> => {
    return new Promise((resolve) => {
      axios.get(`${this.server}/artists/recommendations/documents/templates/${templateId}`).then((response: any) => {
        if (response.status !== 200) {
          resolve({ error: true, message: response.statusText, status: response.status });
        }
        resolve({
          error: false,
          message: response.statusText,
          status: response.status,
          data: response.data,
        });
      }).catch((err: CatchError) => {
        resolve({ error: true, message: err.message, status: err.status });
      });
    });
  };

  createTemplate = async (data: any): Promise<any> => {
    return new Promise((resolve) => {
      resolve('TODO: implement this service to get template info');
    });
  };

  editTemplate = async (data: any): Promise<any> => {
    return new Promise((resolve) => {
      resolve('TODO: implement this service to get template info');
    });
  };
}
