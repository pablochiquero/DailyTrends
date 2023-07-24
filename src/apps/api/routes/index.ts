import { Router } from "express";
import { Container } from "inversify";
import getDailyTrends from "./daily-trends/get-daily-trends";

export default (container: Container) => {
    const app = Router();
    getDailyTrends(app, container);
    return app;
}