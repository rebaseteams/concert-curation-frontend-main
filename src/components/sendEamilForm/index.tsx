import React from 'react';

import { Form, Button, Input } from 'antd';

import createSendEmailData from './utils';

import sendNotification from '../../services/notification';

interface SendEmailFormProp {
  setSendEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendEamilForm = ({ setSendEmailModal }: SendEmailFormProp): JSX.Element => {
  const htmlData = '<div><h2>Hello</h2><p>My name is Cuttime</p><h3>Regards from Krina</h3></div>';

  const sendConcertEmail = async (values: { email: string }) => {
    const sendEmailData = createSendEmailData(values.email, htmlData);

    await sendNotification(sendEmailData);

    setSendEmailModal(false);
  };
  return (
    <Form
      layout="vertical"
      name="nest-messages"
      onFinish={sendConcertEmail}
    >
      <Form.Item name="email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Share
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SendEamilForm;
