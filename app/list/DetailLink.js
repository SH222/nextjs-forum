"use client";

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// useRouter()를 이용한 페이지 이동 방식
export default async function DetailLink(props) {
  let router = useRouter(); // client component에서만 사용 가능

  return (
    <button
      onClick={() => {
        router.push("/detail");
      }}
    >
      이동
    </button>
  );
}
