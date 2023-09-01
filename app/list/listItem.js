"use client";

import Link from "next/link";

export default async function ListItem({ session, result }) {
  return (
    <div>
      {result.map((item, i) => (
        <div className="list-item" key={i}>
          <Link href={`/detail/` + item._id.toString()}>
            <h4>{item.title}</h4>
          </Link>
          <p>{item.content}</p>
          <div style={{ display: session.user.email == item.author ? "inline-block" : "none" }}>
            {/* <div> */}
            <Link href={`/edit/` + item._id.toString()}>🖊</Link>
            <span
              onClick={(e) => {
                // 서버로 데이터를 전송하는 방법
                // 1.
                // fetch("/api/post/delete", {
                //   method: "POST",
                //   body: item._id,
                // })
                //   .then((r) => r.json())
                //   .then(() => {
                //     e.target.parentElement.style.opacity = 0;
                //     setTimeout(() => {
                //       e.target.parentElement.style.display = "none";
                //     }, 1000);
                //   });
                // 2. query string
                // 형식 : url?데이터이름=값&데이터2=값2
                // fetch("/api/test?id=" + item._id.toString())
                //   .then((r) => r.json())
                //   .then(() => {
                //     e.target.parentElement.style.opacity = 0;
                //     setTimeout(() => {
                //       e.target.parentElement.style.display = "none";
                //     }, 1000);
                //   });
                // 3. URL parameter 문법
                fetch("/api/abc/" + item._id.toString())
                  .then((r) => r.json())
                  .then(() => {
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = "none";
                    }, 1000);
                  });
              }}
            >
              ❌
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
