/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplatesInterface } from '../../model/interfaces/templates';
import { GetTemplateResponse, GetTemplatesResponse } from '../../model/types/service-response';

export default class Templates implements TemplatesInterface {
  private templatesRepo: TemplatesInterface;

  constructor(templatesRepo: TemplatesInterface) {
    this.templatesRepo = templatesRepo;
  }

  getTemplates = async (): Promise<GetTemplatesResponse> => new Promise((resolve) => {
    this.templatesRepo.getTemplates().then((response) => {
      resolve(response);
    });
  })

  getTemplate = async (templateId: string):
  Promise<GetTemplateResponse> => new Promise((resolve) => {
    this.templatesRepo.getTemplate(templateId).then((response) => {
      resolve(response);
    });
  })

  createTemplate = async (data: any): Promise<any> => new Promise((resolve) => {
    this.templatesRepo.createTemplate(data).then((response) => {
      resolve(response);
    });
  })

  editTemplate = async (data: any): Promise<GetTemplatesResponse> => new Promise((resolve) => {
    this.templatesRepo.editTemplate(data).then((response) => {
      resolve(response);
    });
  })
}
