import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
  }
  return client;
}

export default connectToDatabase;
