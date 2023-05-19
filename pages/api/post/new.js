import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions); // 서버에서 사용 시에는 req, res도 필요
  console.log(session.user.email);
  if (session) {
    req.body.author = session.user.email;
  }
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
