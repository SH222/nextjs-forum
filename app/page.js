import { connectDB } from "@/util/database";

export default function Home() {
  // const db = (await connectDB).db("forum");
  // let result = await db.collection("post").find().toArray(); // post collection에 있는 모든 데이터를 array 형식으로 가져옴

  return <div className="p-20">Hello</div>;
}
// await fetch("/URL", { next: { revalidate: 60 } });
