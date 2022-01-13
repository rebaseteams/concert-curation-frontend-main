import { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { CreateDocumentForm } from '../../../model/types/collaborationForm';

import './style.scss';
import { Templates } from '../../../model/types/templates';
import renderFormFields, { inputField } from '../FormRenderer';
import { FormFields } from '../../../model/types/formRenderer';
import templateFormDataMapper from './utils';
import { TemplatesInterface } from '../../../model/interfaces/templates';
import { DocumentsInterface } from '../../../model/interfaces/documents';

const { Text } = Typography;

const renderTemplates = (
  templates: Array<Templates>,
  selectTemplate: (templateId: string) => void,
) => _.map(templates, (template) => (
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
));

const CollaborationForm = ({
  recommendationId,
  artistId,
  templatesService,
  documentsService,
}: {
  recommendationId: string;
  artistId: string;
  templatesService: TemplatesInterface;
  documentsService: DocumentsInterface;
}): JSX.Element => {
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Array<FormFields>>([]);
  const [templates, setTemplates] = useState<Array<Templates>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
      status: 403 | 404 | 500 | '403' | '404' | '500';
      title: string;
    }>();
  // TODO: Fetch template questions and field by template id
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const getTemplates = async () => {
      const data = await templatesService.getTemplates();
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
    setLoading(true);
    setTemplateId(template);
    const response = await templatesService.getTemplate(template);
    if (response.error) {
      setError({ status: '404', title: response.message });
      setLoading(false);
      return;
    }
    if (response.data && response.data.success) {
      setFormData(templateFormDataMapper(response.data.data.questions));
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const submitForm = async (value: { name?: string }) => {
    const { name } = value;
    // eslint-disable-next-line no-param-reassign
    delete value.name;
    if (!templateId) {
      message.error('No template Id');
      return;
    }
    const documentFormData: CreateDocumentForm = {
      templateId,
      fields: value,
      recommendationId,
      required: { artistId },
      name: name || 'Document name',
    };

    const response = await documentsService.createDocument(documentFormData);
    if (response.error) {
      message.error(response.message);
      return;
    }
    if (response.data && response.data.success) {
      navigate(`/editor/${response.data.data.document.id}`);
      return;
    }
    message.error(response.message);
  };

  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <Result status={error.status} title={error.title} />;
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
          {inputField(
            {
              label: 'Document Name',
              placeholder: 'Document name',
              required: true,
              name: 'name',
              message: 'document name is required',
            },
            'text',
          )}
          {formData && renderFormFields(formData, { min: 33, max: 33 })}

          <Form.Item label="">
            <Button
              type="link"
              htmlType="button"
              onClick={() => setTemplateId(null)}
            >
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Preview
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
  if (templates) {
    return (
      <>
        <h4>Select template</h4>
        <Row gutter={3}>{renderTemplates(templates, selectTemplate)}</Row>
      </>
    );
  }
  return <Empty />;
};

export default CollaborationForm;
