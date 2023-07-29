import { ContainerModule } from "inversify";
import { FeedsService } from "./application/scrape-feeds/feeds.servcie";
import { NewsService } from "./application/scrape-feeds/news-service";
import { NewsRepository } from "./domain/repositories/news.repository";
import { ScrapeFeedsService } from "./domain/repositories/scrape-feeds.service";
import { ScrapperFeedsCheerio } from "./infrastructure/cheerio-scrapper.service";
import { NewsMongoRepository } from "./infrastructure/news-mongo.repository";
import { NewspapersScrapeFeedsService } from "./infrastructure/newspapers-scrape-feeds.service";
import { ScrapperMapper } from "./infrastructure/scrapperMapper.interface";

export class DailyTrendsModule extends ContainerModule {
    public constructor() {
        super((bind) => {
            bind<FeedsService>(FeedsService).toSelf();
            bind<ScrapeFeedsService>('ScrapeFeedsService').to(NewspapersScrapeFeedsService);
            bind<ScrapperMapper>('ScrapperMapper').to(ScrapperFeedsCheerio);
            bind<NewsService>(NewsService).toSelf();
            bind<NewsRepository>('NewsRepository').to(NewsMongoRepository);
        });
    }
}