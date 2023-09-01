import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions); // 유저정보

  // if (session) {
  //   return res.status(500).json(session);
  // } else {
  // console.log("세션", session.email);
  if (req.method == "POST") {
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("comment").deleteOne({ _id: new ObjectId(req.body) });
      // .json(session.email);
      return res.status(200);
    } catch (e) {
      console.log(e);
    }
    // }
  }
}
