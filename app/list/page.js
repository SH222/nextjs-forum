import { connectDB } from "@/util/database";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray(); // post collection에 있는 모든 데이터를 array 형식으로 가져옴

  return (
    <div className="list-bg">
      {result.map((item, i) => {
        return (
          <div className="list-item" key={i}>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </div>
        );
      })}
    </div>
  );
}
