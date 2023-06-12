import { connectDB } from "@/util/database";
import bcrypt from "bcrypt"; // 비밀번호 암호화 라이브러리

export default async function handler(req, res) {
  if (req.method == "POST") {
    let hash = await bcrypt.hash(req.body.password, 10); // 비밀번호 암호화
    req.body.password = hash;
    const db = (await connectDB).db("forum");
    let result = await db.collection("user_cred").insertOne(req.body);
    res.status(200).redirect(302, "/");
    // 이메일 중복 확인
    // console.log(req.body.email);
  }
}
