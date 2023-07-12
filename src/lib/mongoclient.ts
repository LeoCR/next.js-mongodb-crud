import { MongoClient } from "mongodb";

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid environment variable: "DATABASE_URL"');
}

const uri = process.env.DATABASE_URL as string;

const clientPromise = async()=>{
  const client = new MongoClient(uri, {});
  const clientPromise: Promise<MongoClient> = client.connect();
  return clientPromise;
}

export default clientPromise;
