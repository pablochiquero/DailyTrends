import 'reflect-metadata';
import express from 'express';
import routes from './apps/api/routes';
import { Container } from 'inversify';
import { DailyTrendsModule } from './apps/contexts/dailytrends.module';
import { connectToMongo } from './db';

const app = express();

app.use(express.json())

const container = new Container();
container.load(new DailyTrendsModule());

connectToMongo()
    .then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => console.log('Error connecting to MongoDB:', err)
    );

app.use('/dev', routes(container));

// Error handling
app.use(async (err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message
        }
    })
})

export { app };