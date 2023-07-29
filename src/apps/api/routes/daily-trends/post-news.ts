import express, { Request, Response, Router } from "express";
import { Container } from "inversify";
import { NewsService } from "../../../contexts/application/scrape-feeds/news-service";

const route = Router();

export default (app: Router, container: Container) => {
    app.use('/createnews', route);
    app.use(express.json());


    route.post('',

        async (req: Request, res: Response, next) => {
            try {
                const news: any = req.body;

                const newsService = container.get<NewsService>(NewsService);
                const response = await newsService.createNews(news);

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