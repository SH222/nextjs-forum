import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const db = (await connectDB).db("forum");
      let change = { title: req.body.title, content: req.body.content };
      let result = await db.collection("post").updateOne(
        { _id: new ObjectId(req.body._id) },
        { $set: change } // 수정할 내용
      );
      console.log(result);
      return res.status(200).redirect(302, "/list");
    } catch (error) {
      console.log("수정 에러");
    }
  }
}
