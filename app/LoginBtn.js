"use client";

import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginBtn(props) {
  return (
    <>
      {props.session == null ? (
        <div style={{ display: "inline-block" }}>
          <button
            onClick={() => {
              signIn();
            }}
          >
            login
          </button>
          <button
            onClick={() => {
              redirect("/register");
            }}
          >
            join
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            signOut();
          }}
        >
          logout
        </button>
      )}
    </>
  );
}
