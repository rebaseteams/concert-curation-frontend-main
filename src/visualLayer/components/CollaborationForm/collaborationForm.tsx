import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Empty,
  Form,
  Input,
  message,
  Row,
  Typography,
} from 'antd';
import * as _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { CollaborationFormValues } from '../../../model/types/collaborationForm';
import services from '../../services';
import getTemplates from '../../../utils/templates';

import './style.scss';
import { Templates } from '../../../model/types/templates';

const { Text } = Typography;

const renderTemplates = (
  templates: Array<Templates>,
  selectTemplate: (templateId: string) => void,
) => (_.map(templates, (template) => (
  <Col
    key={template.templateId}
    span={6}
    onClick={() => selectTemplate(template.templateId)}
  >
    <img
      className="template-image"
      src={template.templateImg}
      alt={template.templateName}
    />
    <Text type="secondary">{template.templateName}</Text>
  </Col>
)));

const CollaborationForm = (): JSX.Element => {
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Array<Templates>>();
  // TODO: Fetch template questions and field by template id
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const history = useHistory();

  useEffect(() => {
    setTemplates(getTemplates());
  }, []);

  const selectTemplate = (template: string) => {
    setTemplateId(template);
  };

  const submitForm = async (value: CollaborationFormValues) => {
    const data = await services.Documents.getHtmlTemplate(value);
    if (data.error) {
      message.error('Somthing went wrong');
    } else {
      history.push('/editor/7676', { prams: data.data });
    }
  };
  if (templateId) {
    return (
      <>
        <h4>Enter details</h4>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={submitForm}
        >
          <Form.Item
            label="Artist Name"
            name="artistName"
            initialValue="Nick"
            rules={[{ required: true, message: 'Please input artist Name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Why you want this artist?"
            name="reason"
            rules={[{ required: true, message: 'Please input reason!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="">
            <Button type="link" htmlType="button" onClick={() => setTemplateId(null)}>Back</Button>
            <Button type="primary" htmlType="submit">Preview</Button>
          </Form.Item>
        </Form>
      </>
    );
  }
  if (templates) {
    return (
      <>
        <h4>Select template</h4>
        <Row gutter={3}>
          { renderTemplates(templates, selectTemplate) }
        </Row>
      </>
    );
  }
  return <Empty />;
};

export default CollaborationForm;
