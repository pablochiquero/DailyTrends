import { inject, injectable } from "inversify";
import { ScrapeFeedsService } from "../../domain/repositories/scrape-feeds.service";

/**
 * orchestrator service for call to scrapeFeedsService for get daily news, get news from newspapper and return
 */
@injectable()
export class FeedsService {
    constructor(@inject('ScrapeFeedsService') private scrapeFeedsService: ScrapeFeedsService) { }

    async scrapeFeeds(urls:string[]) {
        const NewspapersDailysTrends = await this.scrapeFeedsService.getWebData(urls);
        return NewspapersDailysTrends;
    }
}