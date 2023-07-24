import { injectable } from "inversify";
import axios from 'axios';
import { ScrapeFeedsRepository } from "../domain/repositories/scrape-feeds.repository";

@injectable()
export class NewspapersScrapeFeedsRepository implements ScrapeFeedsRepository {
    constructor() { }

    async scrapeFeeds(): Promise<any> {
        try {
            // Realizar solicitud HTTP al sitio web de noticias
            const response = await axios.get('https://elpais.com/');

            // console.log((response.data));

            return response.data;
        } catch (error) {
            console.log('Error', error);
            throw error;
        }
    }
}
