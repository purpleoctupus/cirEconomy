import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          return null;
        }
        
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (user?.password) {
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            return null;
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",

  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };