import { connectDB } from "@/util/database";

export default async function join() {
  // 서버 연동 응용
  const db = (await connectDB).db("forum");
  let result = await db.collection("member").find().toArray();
  console.log(result);
  return (
    <div className="p-20">
      <h4>회원가입</h4>
      <form action="/api/post/joinMember" method="POST">
        <span>ID</span>
        <input type="text" name="id" />
        <span>PW</span>
        <input type="text" name="pw" />
        <button type="submit">가입</button>
      </form>
    </div>
  );
}
