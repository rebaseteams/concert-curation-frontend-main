import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Empty,
  Form,
  message,
  Result,
  Row,
  Spin,
  Typography,
} from 'antd';
import * as _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { CreateDocumentForm } from '../../../model/types/collaborationForm';
import services from '../../services';
// import getTemplates from '../../../utils/templates';

import './style.scss';
import { Templates } from '../../../model/types/templates';
import renderFormFields, { inputField } from '../FormRenderer';
import { FormFields } from '../../../model/types/formRenderer';
import templateFormDataMapper from './utils';

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

const CollaborationForm = ({ recommendationId }: {recommendationId: string}): JSX.Element => {
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Array<FormFields>>([]);
  const [templates, setTemplates] = useState<Array<Templates>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{status: 403 | 404 | 500 | '403' | '404' | '500', title: string}>();
  // TODO: Fetch template questions and field by template id
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const getTemplates = async () => {
      const data = await services.Templates.getTemplates();
      if (data.error) {
        setError({ status: '404', title: data.message });
      }
      if (data.data && data.data.success) {
        setTemplates(data.data.data);
      }
      setLoading(false);
    };
    getTemplates();
  }, []);

  const selectTemplate = async (template: string) => {
    setTemplateId(template);
    const response = await services.Templates.getTemplate(template);
    if (response.error) {
      setError({ status: '404', title: response.message });
    }
    if (response.data && response.data.success) {
      setFormData(templateFormDataMapper(response.data.data.questions));
    }
  };

  const submitForm = async (value: { name?: string }) => {
    const { name } = value;
    // eslint-disable-next-line no-param-reassign
    delete value.name;
    const result: CreateDocumentForm = {
      templateId: templateId || '1234',
      fields: value,
      recommendationId,
      name: name || 'Document name',
    };

    const response = await services.Documents.createDocument(result);
    if (response.error) {
      message.error('Somthing went wrong');
      return;
    }
    if (response.data && response.data.success) {
      history.push(`/editor/${response.data.data.document.id}`);
      return;
    }
    message.error('Bad Request');
  };

  if (loading) {
    return <Spin />;
  }
  if (error) {
    return (
      <Result
        status={error.status}
        title={error.title}
      />
    );
  }
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
          { inputField({
            label: 'Document Name',
            placeholder: 'Document name',
            required: true,
            name: 'name',
            message: 'document name is required',
          }, 'text') }
          { formData && renderFormFields(formData, { min: 33, max: 33 }) }

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
