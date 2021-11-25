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

const CollaborationForm = (): JSX.Element => {
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
          <Button type="primary" htmlType="submit">Preview</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CollaborationForm;
