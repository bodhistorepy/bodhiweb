// @ts-nocheck
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Por favor, define la variable de entorno MONGODB_URI dentro de .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: any;
let clientPromise: Promise<any>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as any;

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;