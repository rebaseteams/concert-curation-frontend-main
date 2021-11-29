import { SendGridEmailData } from '../../../model/types/sendGridEmailData';

const createSendEmailData = (email: string, htmlData: string): SendGridEmailData => ({
  type: 'email',
  receiver: {
    to: email,
    cc: '',
  },
  sender: {
    vendor: {
      name: 'SENDGRID',
    },
  },
  content: {
    type: 'HTML',
    html: htmlData,
    subject: 'Testing email',
    values: '',
  },
});

export default createSendEmailData;
