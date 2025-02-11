import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async (credentials) => {
        await connectDB();
        let user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found. Please sign up first.");
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async jwt({ token, user }) {
    //   const now = Math.floor(Date.now() / 1000);
    //   if (user) {
    //     token.role = user.role;
    //     token.id = user.id;
    //     token.exp = Math.floor(Date.now() / 1000) + 3600;
    //   }
    //   return token;
    // },

    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);

      // If the user logs in for the first time, set initial token values
      if (user) {
        return {
          id: user.id,
          role: user.role,
          name: user.name,
          email: user.email,
          exp: now + 3600, // Token expires in 1 hour
          iat: now,
        };
      }

      // If the token is expired, refresh it
      if (now > token.exp) {
        return {
          ...token,
          exp: now + 3600, // Extend expiration by 1 hour
          iat: now,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.exp = token.exp;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
