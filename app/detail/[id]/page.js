import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Like from "./Like";
import style from "./detail.module.css";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").findOne({ _id: new ObjectId(props.params.id) });
  let session = await getServerSession(authOptions); // 유저정보
  return (
    <div className="p-20">
      <Like session={session} _id={result._id.toString()} />
      <h4>상세페이지</h4>
      {result._id.toString()}
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <Comment _id={result._id.toString()} session={session} />
    </div>
  );
}
