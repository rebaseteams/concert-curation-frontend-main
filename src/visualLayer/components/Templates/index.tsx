import React from 'react';

import * as _ from 'lodash';
import {
  Col, Row, Typography,
} from 'antd';

import './style.scss';

const { Text } = Typography;

type Templates = {
  id: string,
  name: string,
  image: string,
}

type TemplatesProp = {
  selectTemplate: (templateId: string) => void;
};

const renderTemplates = (
  templates: Array<Templates>,
  selectTemplate: (templateId: string) => void,
) => (_.map(templates, (template) => (
  <Col
    span={8}
    onClick={() => selectTemplate(template.id)}
  >
    <img
      className="template-image"
      src={template.image}
      alt={template.name}
    />
    <Text type="secondary">{template.name}</Text>
  </Col>
)));

const Templates = ({ selectTemplate }: TemplatesProp): JSX.Element => {
  const templates = [
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
      id: '1234',
      name: 'Template 1',
      image: 'https://i.pinimg.com/originals/ee/2d/a1/ee2da11be884525b6c41f8eb3994f184.jpg',
    },
    {
      id: '1235',
      name: 'Template 2',
      image: 'https://i.pinimg.com/originals/2c/29/90/2c29907e825b210659eef954c2492c54.jpg',
    },
  ];

  return (
    <Row gutter={3}>
      { renderTemplates(templates, selectTemplate) }
    </Row>
  );
};

export default Templates;
