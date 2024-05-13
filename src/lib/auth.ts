import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials"
import api from "./api";

const refreshTokenApiCall = async (token: JWT) => {
  const url = process.env.NEXT_PUBLIC_API_BACKEND + '/refresh';
  const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token.accessToken}`
      }
  })
  const data = await res.json();
  if(!data.error) {
      return {
          ...token,
          error: null,
          accessToken: data.access_token,
          expiresIn: (Date.now() + (parseInt(data.expires_in) * 1000) - 2000)
      }
  } else {
      return {
          error: "RefreshTokenTokenError"
      }
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const url = process.env.NEXT_PUBLIC_API_BACKEND + '/login';
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const user = await res.json();

        if (!user.error) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
        session.accessToken = token.accessToken;
        session.tokenType = token.tokenType;
        session.expiresIn = token.expiresIn;
        if(session?.accessToken ?? false) {
          api.defaults.headers.common['Authorization'] = `${token.tokenType} ${token.accessToken}`;


          const url = process.env.NEXT_PUBLIC_API_BACKEND + '/me';
          const userRes = await fetch(url, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token.accessToken}`
            }
          })
          const userDetails = await userRes.json();
          if(!userDetails.error) {
            session.user = userDetails;
          }
        }
      return session
    },
    async jwt({ token, user}) {
      if(user) {
        token.accessToken = user.access_token;
        token.tokenType = user.token_type;
        token.expiresIn = (Date.now() + (user.expires_in * 1000) - 2000);
      }

      if(Date.now() < token.expiresIn) {
        return token
      }

      // const url = process.env.NEXT_PUBLIC_API_BACKEND + '/refresh';
      // const refreshTokenRes = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Authorization": `Bearer ${token.accessToken}`
      //   }
      // })
      // const refreshToken = await refreshTokenRes.json();

      // if (!refreshToken.error) {
      //   token.accessToken = refreshToken.access_token;
      //   token.tokenType = refreshToken.token_type;
      //   token.expiresIn = refreshToken.expires_in;
      // }

      return await refreshTokenApiCall(token)
    }
  },
});
