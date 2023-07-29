import { Feed } from "../domain/models/feed.model";
import { WebData } from "./models/webData.model";

export interface ScrapperMapper {
    mapData(webdata:WebData[]): Promise<Feed[]>
}