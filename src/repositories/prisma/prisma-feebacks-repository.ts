import { prisma } from "../../prisma";
import { FeedBacksCreateData, FeedBacksRepository } from "../feedbacks-repository";

export class PrismaFeedBackRepository implements FeedBacksRepository {
  async create({ type, comment, screenshot }: FeedBacksCreateData) {
    await prisma.feedBack.create({
      data: {
        type: type,
        comment: comment,
        screenshot: screenshot
      }
    })
  };
}