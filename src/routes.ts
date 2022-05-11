import express from 'express'
import nodemailer from 'nodemailer';
import { NodeMailerAdapter } from './adapters/nodemailer-adapter/nodemailer-adapter';
import { prisma } from './prisma';
import { PrismaFeedBackRepository } from './repositories/prisma/prisma-feebacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feeback-use-case';

export const routes = express.Router();

// const transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "f5787722ff4c0f",
//     pass: "a10b8ace9a074b"
//   }
// });

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedBackRepository = new PrismaFeedBackRepository()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedBackRepository);
  const nodeMailerAdapter = new NodeMailerAdapter();

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });

  await nodeMailerAdapter.sendMail({
    to: 'Diego Souza <contato@odiegosouza.com.br>',
    from: 'Equipe Feedget <oi@feedget.com>',
    subject: 'Email Marketing',
    body: [`<div style="color:#cfcfcf; background:#2f3542; width:100%; height:100%; display:flex; flex-direction: column; align-items: center; justify-content: center;">`,
      `<p>Tipo do feebback: ${type}</p>`,
      `<p>Comentario: ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  // await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'Diego Souza <dgoheri@gmail.com>',
  //   subject: 'Novo FeedBack',
  //   html: [
  //     `<div style="color:#cfcfcf; background:red; width:100%; height:100%; display:flex; flex-direction: column; align-items: center; justify-content: center;">`,
  //     `<p>Tipo do feebback: ${type}</p>`,
  //     `<p>Comentario: ${comment}</p>`,
  //     `</div>`
  //   ].join('\n')
  // });

  return res.status(201).send();

})
