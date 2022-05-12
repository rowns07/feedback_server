import { MailAdapter } from "../adapters/mail-adapter";
import { FeedBacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}
export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedBacksRepository,
    private mailAdapter: MailAdapter
  ) { }

  async execute(request: SubmitFeedbackUseCaseRequest) {

    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      to: 'Diego Souza <contato@odiegosouza.com.br>',
      from: 'Equipe Feedget <oi@feedget.com>',
      subject: 'Email Marketing',
      body: [`<div style="color:#cfcfcf; background:#2f3542; width:100%; height:100%; display:flex; flex-direction: column; align-items: center; justify-content: center;">`,
        `<p>Tipo do feebback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}"/>` : null,
        `</div>`
      ].join('\n')
    })

  }
}