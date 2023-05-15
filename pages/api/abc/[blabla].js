import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // console.log(req.query.blabla); // URL parameter 자리에 user가 입력한 값이 출력
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").deleteOne({ _id: new ObjectId(req.query.blabla) });
  return res.status(200).json("");
}
