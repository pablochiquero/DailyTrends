import { Feed } from "../models/feed.model";

export interface NewsRepository {
    createNews(news: Feed[]): Promise<boolean>;

    getDailyNews(): Promise<Feed[]>;
}