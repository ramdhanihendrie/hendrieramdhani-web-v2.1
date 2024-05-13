import NextAuth, { Account } from 'next-auth';

declare module 'next-auth' {
  interface User {
    access_token: string;
    token_type: string;
    expires_in: number;
  }

  interface Session{
    accessToken?: Account.accessToken
    tokenType?: Account.tokenType
    expiresIn?: Account.expiresIn
    user?: Account.user
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: Account.accessToken
    tokenType?: Account.tokenType
    expiresIn?: Account.expiresIn
    user?: Account.user
  }
}