import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const likeDocument = {
    email: req.body.email,
    parent: req.body.parent,
  };
  console.log("req.body", req.body);
  if (req.method == "POST") {
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("like").insertOne(likeDocument);
      return res.status(200);
    } catch (e) {
      console.log(e);
    }
    // }
  }
}
