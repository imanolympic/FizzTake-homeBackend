import { MongoClient } from "mongodb";

let cachedClient: MongoClient;

export default async function connectClient(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const uri = process.env.FIZZ_DB_URI as string;
    const client = await MongoClient.connect(uri);

    console.log("Successfully connected to DB");

    cachedClient = client;
    return client;
  } catch (e) {
    console.log("Unable to connect to DB");
    process.exit(1);
  }
}
