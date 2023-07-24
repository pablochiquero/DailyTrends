import express, { Request, Response, Router } from "express";
import { Container } from "inversify";
import { ScrapeFeedsService } from "../../../contexts/application/scrape-feeds/scrape-feeds.servcie";

const route = Router();


export default (app: Router, container: Container) => {
    app.use('/getdailytrends', route);
    app.use(express.json());

    route.get('',

        async (req: Request, res: Response, next) => {
            try {
                const scrapeTrends = container.get<ScrapeFeedsService>(ScrapeFeedsService);

                const response: any = await scrapeTrends.scrapeFeeds();
                if (response) {
                    res.status(201).json(response)
                } else {
                    res.status(500).json(response)
                }
                
            } catch (error) {
                console.log(error);
                next(error);
            }
        }
    )
}