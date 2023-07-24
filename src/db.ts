import { MongoClient, ServerApiVersion } from "mongodb";
import * as path from 'path';

const dotenvPath = path.resolve(__dirname, '.env');
require('dotenv').config({ path: dotenvPath })
// const uri = process.env.MONGODB_URI;
const uri = "mongodb+srv://pablochiquero120snasdQ:AForQvJs8aeJuIIS@datapab.hqsotei.mongodb.net/?retryWrites=true&w=majority"

export const client = new MongoClient(uri as string, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  
  export async function connectToMongo() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw new Error(error as any);
      
    }
  }
  
  export async function closeMongoConnection() {
    try {
      await client.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  }
  

