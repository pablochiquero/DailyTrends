import express, { Request, Response, Router } from "express";
import { Container } from "inversify";
import { FeedsService } from "../../../contexts/application/scrape-feeds/feeds.servcie";

const route = Router();

export default (app: Router, container: Container) => {
    app.use('/getdailytrends', route);
    app.use(express.json());

    route.get('',

        async (req: Request, res: Response, next) => {
            try {
                const scrapeTrends = container.get<FeedsService>(FeedsService);

                // SENT URLS FROM BODY OF POSTMAN OR DESCOMMENT THIS
                // const urls = [
                //     'https://elpais.com/',
                //     'https://www.elmundo.es/'
                // ];

                const urls: string[] = req.body;

                const response = await scrapeTrends.scrapeFeeds(urls);
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