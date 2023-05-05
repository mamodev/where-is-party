import { Session } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  // Configure one or more authentication providers
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.profile_image = token.profile_image;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.email = token.email;
        session.user.phone_number = token.phone_number;
        session.user.last_login = token.last_login;
        session.user.access_revoked = token.access_revoked;
        session.user.date_joined = token.date_joined;
        session.user.staff_roles = token.staff_roles;
        session.user.created_at = token.created_at;
        session.user.updated_at = token.updated_at;
      }
      return session;
    },

    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id;
        token.profile_image = user.profile_image;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.email = user.email;
        token.phone_number = user.phone_number;
        token.last_login = user.last_login;
        token.access_revoked = user.access_revoked;
        token.date_joined = user.date_joined;
        token.staff_roles = user.staff_roles;
        token.created_at = user.created_at;
        token.updated_at = user.updated_at;
      }
      return token;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Accedi",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;

        const userData = await res.json();
        return userData;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
