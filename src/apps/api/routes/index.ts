import { Router } from "express";
import { Container } from "inversify";
import getDailyTrends from "./daily-trends/get-daily-trends";
import postNews from "./daily-trends/post-news";

export default (container: Container) => {
    const app = Router();
    getDailyTrends(app, container);
    postNews(app, container);
    return app;
}