import React from 'react';
import {
  Button,
  Form,
  Input,
  message,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { CollaborationFormValues } from '../../../model/types/collaborationForm';
import services from '../../services';

type CollaborationFormProp = {
  templateId: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string | null>>
}

const CollaborationForm = ({ templateId, setSelectedTemplate }:
  CollaborationFormProp): JSX.Element => {
  // TODO: Fetch template questions and field by template id
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const id = templateId;
  const history = useHistory();
  const submitForm = async (value: CollaborationFormValues) => {
    const data = await services.Documents.getHtmlTemplate(value);
    if (data.error) {
      message.error('Somthing went wrong');
    } else {
      history.push('/editor/7676', { prams: data.data });
    }
  };
  return (
    <>
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
          <Button type="link" htmlType="button" onClick={() => setSelectedTemplate(null)}>Back</Button>
          <Button type="primary" htmlType="submit">Preview</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CollaborationForm;
