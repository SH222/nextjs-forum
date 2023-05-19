import { connectDB } from "@/util/database";
import Link from "next/link";
import ListItem from "./listItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

export default async function List() {
  let session = await getServerSession(authOptions);
  // console.log("session" + session.user.email);
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });
  console.log(result.author);

  return (
    <div className="list-bg">
      <Link href={"/write"}>
        <button>글 작성</button>
      </Link>
      <ListItem result={result} session={session} />
    </div>
  );
}
