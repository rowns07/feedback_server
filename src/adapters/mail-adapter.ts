export interface MailAdapterData {
  to: string,
  from: string,
  subject: string,
  body: string
}

export interface MailAdapter {

  sendMail: (data: MailAdapterData) => Promise<void>;
}