"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginBtn(props) {
  return (
    <>
      {props.session == null ? (
        <button
          onClick={() => {
            signIn();
          }}
        >
          login
        </button>
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
