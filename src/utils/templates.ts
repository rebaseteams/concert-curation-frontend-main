import { Templates } from '../model/types/templates';

const getTemplates = (): Array<Templates> => [
  {
    id: '1294',
    name: 'Blank',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Blank_square.svg/2048px-Blank_square.svg.png',
  },
  {
    id: '1234',
    name: 'Template 1',
    image: 'https://binaries.templates.cdn.office.net/support/templates/en-us/lt55635225_quantized.png',
  },
  {
    id: '1235',
    name: 'Template 2',
    image: 'https://binaries.templates.cdn.office.net/support/templates/en-us/lt89616653_quantized.png',
  },
  {
    id: '1237',
    name: 'Template 1',
    image: 'https://i.pinimg.com/originals/ee/2d/a1/ee2da11be884525b6c41f8eb3994f184.jpg',
  },
  {
    id: '1223',
    name: 'Template 2',
    image: 'https://i.pinimg.com/originals/2c/29/90/2c29907e825b210659eef954c2492c54.jpg',
  },
];

export default getTemplates;
