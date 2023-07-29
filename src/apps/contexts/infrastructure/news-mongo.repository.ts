import { NewsRepository } from "../domain/repositories/news.repository";
import { client } from "../../../db";
import { injectable } from "inversify";
import { Feed } from "../domain/models/feed.model";

/**
 * Repository for create news and get news from mongo
 */
@injectable()
export class NewsMongoRepository implements NewsRepository {
    constructor() { }

    async createNews(newsArr: Feed[]): Promise<boolean> {
        try {
            for (const news of newsArr) {
                const newNumber = this.generateNewtNumber();
                const itemToInsert = { ...news, newNumber, created: new Date() };
                await client.db('news').collection('newsData').insertOne(itemToInsert);
                console.log('News inserted successfully:', itemToInsert);
            }

            return true;
        } catch (error) {
            console.error("Error inserting news:", error);
            throw error;
        }
    }

    async getDailyNews(): Promise<Feed[]> {

        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const result = await client
                .db('news')
                .collection('newsData')
                .find({ created: { $gte: today } })
                .toArray();

            const dailyNews: Feed[] = await result.map((item: any) => ({
                url: 'mongo',
                title: item.title,
                description: item.description
            }));

            return dailyNews;
        } catch (error) {
            console.error("Error getting daily news:", error);
            throw error;
        }
    }


    private generateNewtNumber(): string {
        const length = 10;
        let newNumber = '';
        for (let i = 0; i < length; i++) {
            newNumber += Math.floor(Math.random() * 10).toString();
        }
        return newNumber;
    }
}