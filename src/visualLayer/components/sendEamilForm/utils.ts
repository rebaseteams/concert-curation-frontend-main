export interface SendGridEmailData {
  type: string,
  receiver: {
    to: string,
    cc: string,
  },
  sender: {
    vendor: {
      name: string,
    },
  },
  content: {
    type: string,
    html: string,
    subject: string,
    values: string,
  },
}

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
