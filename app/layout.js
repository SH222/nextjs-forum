import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import LoginBtn from "./LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Appleforum",
  description: "",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions); // 로그인된 유저 정보 출력 (이름, 이메일 등)
  console.log("session", session);
  const handleLinkClick = (event) => {
    alert("Link Click");
  };
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            Appleforum
          </Link>
          <Link href="/list" onClick={handleLinkClick}>
            <a onClick={handleLinkClick}>List</a>
          </Link>
          {session == null ? "" : session.user.name}
          <LoginBtn session={session} />
        </div>
        {children}
      </body>
    </html>
  );
}
