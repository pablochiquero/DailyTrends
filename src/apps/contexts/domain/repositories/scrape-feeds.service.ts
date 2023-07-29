import { Feed } from "../models/feed.model";

export interface ScrapeFeedsService {
    getWebData(urls:string[]): Promise<Feed[]>;
}