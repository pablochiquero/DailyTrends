import axios from 'axios';
import { inject, injectable } from "inversify";
import { NewsRepository } from "../domain/repositories/news.repository";
import { ScrapeFeedsService } from "../domain/repositories/scrape-feeds.service";
import { ScrapperMapper } from "./scrapperMapper.interface";
import { Feed } from '../domain/models/feed.model';

/**
 * service for call to repository newsRepository for get news of today 
 * from mongo and map data with cheerio in scrapperMapper service  
 */
@injectable()
export class NewspapersScrapeFeedsService implements ScrapeFeedsService {
    constructor(
        @inject('ScrapperMapper') private scrapperMapper: ScrapperMapper,
        @inject('NewsRepository') private newsRepository: NewsRepository) { }

    async getWebData(urls: string[]): Promise<Feed[]> {

        try {
            const webData: { url: string, html: string }[] = []
            for (const url of urls) {
                const data = await axios.get(url);
                webData.push({ url, html: data.data })
            }

            const dailyNewsMongo = await this.newsRepository.getDailyNews();

            const dataMapped = await this.scrapperMapper.mapData(webData);

            const response = dailyNewsMongo.concat(dataMapped);

            return response;
        } catch (error) {
            console.log('Error', error);
            throw error;
        }
    }
}
