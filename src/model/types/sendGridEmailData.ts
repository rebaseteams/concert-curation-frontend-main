export type SendGridEmailData = {
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
};
