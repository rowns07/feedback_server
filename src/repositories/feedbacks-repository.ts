export interface FeedBacksCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedBacksRepository {
  create: (data: FeedBacksCreateData) => Promise<void>;
}