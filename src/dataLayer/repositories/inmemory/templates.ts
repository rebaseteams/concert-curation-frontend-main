/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import { TemplatesInterface } from '../../../model/interfaces/templates';
import { GetTemplateResponse, GetTemplatesResponse } from '../../../model/types/service-response';
import { getTemplateData, getTemplatesData } from './mockData/templates';

export default class TemplatesRepo implements TemplatesInterface {
  getTemplates = async (): Promise<GetTemplatesResponse> => {
    return new Promise((resolve) => {
      resolve({
        error: false, data: getTemplatesData, message: 'ok', status: 200,
      });
    });
  }

  getTemplate = async (templateId: string): Promise<GetTemplateResponse> => {
    return new Promise((resolve) => {
      resolve({
        error: false, data: getTemplateData, message: 'ok', status: 200,
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
