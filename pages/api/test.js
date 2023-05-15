import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // console.log(req.query.id);
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").deleteOne({ _id: new ObjectId(req.query.id) });
  // console.log(result.deletedCount);
  return res.status(200).json("test");
}
