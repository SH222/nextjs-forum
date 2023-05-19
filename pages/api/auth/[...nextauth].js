import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "27e30d99f8744a432d20",
      clientSecret: "6d0484c27060837f96677aeb42513ed5becfbfc7",
    }),
  ],
  secret: "tmdgusqlalfqjsgh",
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
