// db 접속

import { MongoClient } from "mongodb";
const url = "mongodb+srv://admin:qwer1234@cluster0.d2kkjj4.mongodb.net/test";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
