import mongob, { MongoClient } from "mongodb";

export default async function connect() {
  try {
    const uri = process.env.FIZZ_DB_URI as string;
    await MongoClient.connect(uri);

    console.log("Successfully connected to DB");
  } catch (e) {
    console.log("Unable to connect to DB");
    process.exit(1);
  }
}
