import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions); // 유저정보

  if (session === null) {
    // 로그인 체크
    return res.status(500).json("로그인x");
  } else {
    if (req.method == "POST") {
      try {
        req.body = JSON.parse(req.body);

        let commentDocument = {
          content: req.body.comment,
          parent: new ObjectId(req.body._id),
          author: session.user.email,
          name: session.user.name,
        };

        const db = (await connectDB).db("forum");
        let result = await db.collection("comment").insertOne(commentDocument);
        res.status(200).json(commentDocument);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
