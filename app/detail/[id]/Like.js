"use client";

import { useState } from "react";
import style from "./detail.module.css";

export default function Like(props) {
  // console.log("props", props.session.user.email);
  const USEREMAIL = props.session.user.email;
  let [count, setCount] = useState(0);
  return (
    <>
      <div className={style.likeBtnDiv}>
        <button
          className={style.likeBtn}
          onClick={() => {
            fetch("/api/post/like", {
              method: "POST",
              body: JSON.stringify({ email: USEREMAIL, parent: props._id }),
            });
            setCount(++count);
          }}
        >
          ❤
        </button>
      </div>
      <p>{count}</p>
    </>
  );
}
