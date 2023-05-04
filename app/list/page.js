import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray(); // post collection에 있는 모든 데이터를 array 형식으로 가져옴

  return (
    <div className="list-bg">
      {result.map((item, i) => (
        <div className="list-item" key={i}>
          <Link href={`/detail/` + item._id.toString()}>
            <h4>{item.title}</h4>
          </Link>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
