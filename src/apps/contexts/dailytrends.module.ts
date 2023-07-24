import { ContainerModule } from "inversify";
import { ScrapeFeedsService } from "./application/scrape-feeds/scrape-feeds.servcie";
import { NewspapersScrapeFeedsRepository } from "./infrastructure/newspapers-scrape-feeds.repository";
import { ScrapeFeedsRepository } from "./domain/repositories/scrape-feeds.repository";

export class DailyTrendsModule extends ContainerModule {
    public constructor() {
        super((bind) => {
            // bind<DocumentClient>(DocumentClient).toConstantValue(new DocumentClient());
            // bind<CreateTask>(CreateTask).toSelf();
            bind<ScrapeFeedsService>(ScrapeFeedsService).toSelf();
            bind<ScrapeFeedsRepository>('ScrapeFeedsRepository').to(NewspapersScrapeFeedsRepository);

            // bind<CreateTaskRepository>('CreateTaskRepository').to(CreateTaskDyanmoRepository);
            // bind<GetImages>(GetImages).toSelf();
            // bind<GetImagesRepository>('GetImagesRepository').to(GetImagesS3Repository);
            // bind<GetTasks>(GetTasks).toSelf();
            // bind<GetTasksRepository>('GetTasksRepository').to(GetTasksDynamoRepository);
        });
    }
}