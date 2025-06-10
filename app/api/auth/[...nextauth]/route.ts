import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// 配置NextAuth
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user, account, profile }: any) {
      // 初始登录时
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
        };
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// NextAuth处理函数
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
