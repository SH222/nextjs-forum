import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("post").deleteOne({ _id: new ObjectId(req.body) });
      // console.log(result.deletedCount); // 삭제 결과
      if (result.deletedCount == 1) {
        res.status(200).json("삭제완료");
      } else if (result.deletedCount == 0) {
        res.status(500).json("삭제실패");
      }
    } catch {
      console.log("error");
    }
  }
}
