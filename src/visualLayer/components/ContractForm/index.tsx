/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { Label } from 'recharts';
import { DocusignFormData } from '../../../model/types/docusign/docusignForm';

type DocusignFormProps = {
  sendContract: (data: DocusignFormData) => void;
}
const DocusignForm = ({
  sendContract,
}: DocusignFormProps): JSX.Element => {
  const hello = '84';
  const [acceptTerm, setAcceptTerm] = useState(false);
  return (
    <>
      <Form
        onFinish={(data) => sendContract(data)}
        layout="vertical"
      >
        <Form.Item name="fileName" label="Contract Name" required>
          <Input type="text" placeholder="Contract for Emma" />
        </Form.Item>
        <Form.Item name="emailSubject" label="Email Subject" required>
          <Input type="text" placeholder="Please enter Subject to be sent in email" />
        </Form.Item>
        <Form.Item name="ccEmail" label="CC Email" required>
          <Input type="email" placeholder="Enter email for carbon copy" />
        </Form.Item>
        <Form.Item name="ccName" label="CC Name" required>
          <Input type="text" placeholder="Name of carbon copy rechiver" />
        </Form.Item>
        <Form.Item name="accept">
          <Input type="checkbox" checked={acceptTerm} onClick={() => setAcceptTerm(!acceptTerm)} />
          <span>We will send a signable contract to the artist email or managers email</span>
        </Form.Item>
        {
          acceptTerm
            ? <Button type="primary" htmlType="submit">Send</Button>
            : <Button disabled type="primary">Send</Button>
        }
      </Form>
    </>
  );
};

export default DocusignForm;
