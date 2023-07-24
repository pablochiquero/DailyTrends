import { inject, injectable } from "inversify";
import { ScrapeFeedsRepository } from "../../domain/repositories/scrape-feeds.repository";

@injectable()
export class ScrapeFeedsService {
    constructor(@inject('ScrapeFeedsRepository') private scrapeFeedsRepository: ScrapeFeedsRepository) { }

    async scrapeFeeds() {
        const NewspapersDailysTrends = await this.scrapeFeedsRepository.scrapeFeeds();

        console.log(NewspapersDailysTrends);
        
        return 'asd';
    }
}