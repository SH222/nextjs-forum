"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  const USEREMAIL = props.session.user.email;
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);
  // 댓글 데이터 가져옴
  useEffect(() => {
    fetch("/api/comment/list?id=" + props._id)
      .then((r) => r.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <hr></hr>
      <div>
        <b>댓글</b>
      </div>
      <div>
        {data.length > 0
          ? data.map((item, i) => {
              return (
                <p key={i}>
                  <span>
                    <b>{item.name} </b>
                  </span>
                  {item.content}
                  {item.author === USEREMAIL ? ( // 삭제버튼
                    <button
                      onClick={() => {
                        fetch("/api/comment/delete", { method: "POST", body: item._id });
                      }}
                    >
                      x
                    </button>
                  ) : (
                    ""
                  )}
                </p>
              );
            })
          : "댓글 없음"}
      </div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
        value={comment}
      />
      <button
        onClick={() => {
          if (comment == "") {
            alert("댓글을 작성하세요");
          } else {
            fetch("/api/comment/new", {
              method: "POST",
              body: JSON.stringify({ comment: comment, _id: props._id }),
            }).then((r) => {
              if (!r.ok) {
                alert("로그인이 필요합니다.");
                throw new Error(`${r.status} 에러`);
              }
            });
            setComment("");
          }
        }}
      >
        댓글 입력
      </button>
    </div>
  );
}
