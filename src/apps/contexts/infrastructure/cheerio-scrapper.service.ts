import { load } from 'cheerio';
import { injectable } from "inversify";
import { Feed } from "../domain/models/feed.model";
import { WebData } from "./models/webData.model";
import { ScrapperMapper } from "./scrapperMapper.interface";

/**
 * service to load html of newspapper and get five first news
 */
@injectable()
export class ScrapperFeedsCheerio implements ScrapperMapper {
    constructor() { }

    async mapData(webData: WebData[]): Promise<Feed[]> {
        const feeds: Feed[] = [];
        try {
            const newPromises = webData.map((data) => this.getNews(data));
            const newsArr = await Promise.all(newPromises);

            newsArr.forEach((e) => feeds.push(...e));
            console.log('Feeds extraídos correctamente');
            return feeds;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    private async getNews(data: WebData): Promise<Feed[]> {

        const $ = load(data.html);
        const articles = $('article');

        const news: Feed[] = [];

        for (let i = 0; i < 5; i++) {
            const article = articles[i];
            const title = $(article).find('h2').text();
            const description = $(article).find('p').text();

            const obj: Feed = {
                url: data.url,
                title: title,
                description: description
            }
            news.push(obj)
        }

        return news;
    }
}