import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method == "POST") {
    // if (req.body.title == "") {
    //   return res.status(500).json("제목안씀");
    // }
    // // DB 에러 예외처리
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("post").insertOne(req.body);
      return res.status(200).redirect(302, "/list");
    } catch (error) {
      console.log("error");
    }
  }
}
