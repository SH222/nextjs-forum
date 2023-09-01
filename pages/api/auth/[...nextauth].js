import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "27e30d99f8744a432d20",
      clientSecret: "6d0484c27060837f96677aeb42513ed5becfbfc7",
    }),

    // JWT 로그인 방식 (session 사용 불가)
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성 해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" }, // login 페이지의 input들은 내가 결정
        password: { label: "password", type: "password" },
      },

      //2. 로그인 요청 시 실행되는 코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("forum");
        let user = await db.collection("user_cred").findOne({ email: credentials.email });
        // email 중복 검사
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        // 비밀번호 확인
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],
  //3. jwt 써놔야 잘됨 + jwt 만료일설정
  session: {
    strategy: "jwt", // session 쓸지, jwt 쓸지 결정하는 부분
    maxAge: 30 * 24 * 60 * 60, // 30일 (로그인 상태 유지 기간)
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어감
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name; // jwt에 기입할 정보들
        token.user.email = user.email;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user; // 토큰에 있는 모든 데이터를 컴포넌트로 보냄
      return session;
    },
  },

  adapter: MongoDBAdapter(connectDB),
  secret: "tmdgusqlalfqjsgh",
};
export default NextAuth(authOptions);
