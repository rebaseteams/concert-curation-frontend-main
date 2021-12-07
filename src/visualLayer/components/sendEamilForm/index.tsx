import {
  Form, Button, Input, message,
} from 'antd';

import createSendEmailData from './utils';
import sendNotification from '../../../utils/notification';

interface SendEmailFormProp {
  setSendEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendEamilForm = ({ setSendEmailModal }: SendEmailFormProp): JSX.Element => {
  const htmlData = '<div><h2>Hello</h2><p>My name is Cuttime</p><h3>Regards from Krina</h3></div>';

  const sendConcertEmail = async (values: { email: string }) => {
    const sendEmailData = createSendEmailData(values.email, htmlData);

    // await sendNotification(sendEmailData);
    const response = await sendNotification(sendEmailData);
    if (response.error) {
      message.error('Somthing went wrong');
      setSendEmailModal(false);
      return;
    }
    message.success('Email sent successfully');
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
