import { TemplateResponse, Templates } from '../../../../model/types/templates';

// eslint-disable-next-line import/prefer-default-export
export const getTemplateData: TemplateResponse = {
  success: true,
  data: {
    templateId: '1234',
    questions: [
      {
        type: 'string',
        question: 'Artists name?',
        field: 'artistName',
      },
    ],
  },
};

export const getTemplatesData: { success: boolean, data: Array<Templates> } = {
  success: true,
  data: [
    {
      templateId: '1294',
      templateName: 'Blank',
      templateImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Blank_square.svg/2048px-Blank_square.svg.png',
    },
    {
      templateId: '1234',
      templateName: 'Template 1',
      templateImg: 'https://binaries.templates.cdn.office.net/support/templates/en-us/lt55635225_quantized.png',
    },
    {
      templateId: '1235',
      templateName: 'Template 2',
      templateImg: 'https://binaries.templates.cdn.office.net/support/templates/en-us/lt89616653_quantized.png',
    },
    {
      templateId: '1237',
      templateName: 'Template 1',
      templateImg: 'https://i.pinimg.com/originals/ee/2d/a1/ee2da11be884525b6c41f8eb3994f184.jpg',
    },
    {
      templateId: '1223',
      templateName: 'Template 2',
      templateImg: 'https://i.pinimg.com/originals/2c/29/90/2c29907e825b210659eef954c2492c54.jpg',
    },
  ],
};
