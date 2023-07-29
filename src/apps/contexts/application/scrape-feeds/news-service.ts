import { inject, injectable } from "inversify";
import { Feed } from "../../domain/models/feed.model";
import { NewsRepository } from "../../domain/repositories/news.repository";

/**
 * orchestrator service for create news
 */
@injectable()
export class NewsService {
    constructor(@inject('NewsRepository') private NewsRepository: NewsRepository) { }

    async createNews(news: Feed[]) {
        const createNews = await this.NewsRepository.createNews(news);
        return createNews;
    }
}