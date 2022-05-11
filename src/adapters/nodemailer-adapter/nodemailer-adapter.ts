import { MailAdapter, MailAdapterData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f5787722ff4c0f",
    pass: "a10b8ace9a074b"
  }
});

export class NodeMailerAdapter implements MailAdapter {
  async sendMail({ from, to, subject, body }: MailAdapterData) {
    await transport.sendMail({
      from,
      to,
      subject,
      html: body
    });
  };
}