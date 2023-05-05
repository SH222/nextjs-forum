import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method == "POST") {
    if (req.body.id == "" && req.body.pw) {
      return res.status(500).json("id, pw 확인");
    }
    // DB 에러 예외처리
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("member").insertOne(req.body);
      // let idList = await db.collection("member").find().toArray(id);
      // console.log()
      return res.status(200).redirect(302, "/");
    } catch (error) {
      console.log("error");
    }
  }
}
