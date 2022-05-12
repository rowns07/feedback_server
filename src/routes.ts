import express from 'express';
import { NodeMailerAdapter } from './adapters/nodemailer-adapter/nodemailer-adapter';
import { PrismaFeedBackRepository } from './repositories/prisma/prisma-feebacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feeback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedBackRepository = new PrismaFeedBackRepository()
  const nodeMailerAdapter = new NodeMailerAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedBackRepository,
    nodeMailerAdapter
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });


  return res.status(201).send();

})
