import { GetTemplateResponse, GetTemplatesResponse } from '../types/service-response';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TemplatesInterface {
  getTemplates: () => Promise<GetTemplatesResponse>;
  getTemplate: (templateId: string) => Promise<GetTemplateResponse>;
  createTemplate: (data: any) => Promise<any>;
  editTemplate: (data: any) => Promise<any>;
}
