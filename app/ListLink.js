"use client";

import Link from "next/link";

export default function listLink({ session }) {
  // console.log(session === null);
  // console.log(session);
  return (
    <>
      {session === null ? (
        <Link href="/" session={session}>
          List
        </Link> // 더 좋은 방법 찾기
      ) : (
        <Link href="/list" session={session}>
          List
        </Link>
      )}
    </>
  );
}
