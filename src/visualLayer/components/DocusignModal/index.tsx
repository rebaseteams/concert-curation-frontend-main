/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Form, Input } from 'antd';
import { DocusignFormData } from '../../../model/types/docusign/docusignForm';

type DocusignFormProo = {
  sendContract: (data: DocusignFormData) => void;
}
const DocusignForm = ({ sendContract }: DocusignFormProo): JSX.Element => {
  const hello = '84';
  return (
    <>
      <Form
        onFinish={(data) => sendContract(data)}
      >
        <h4>Enter File details</h4>
        <Form.Item name="fileName" label="Contract Name" required>
          <Input type="text" />
        </Form.Item>

        <h4>Enter Email Messages</h4>
        <Form.Item name="emailSubject" label="Email Subject" required>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="ccEmail" label="CC Email" required>
          <Input type="email" />
        </Form.Item>
        <Form.Item name="ccName" label="CC Name" required>
          <Input type="text" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Send</Button>
      </Form>
    </>
  );
};

export default DocusignForm;
