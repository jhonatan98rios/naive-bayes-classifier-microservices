import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {},
    //   async authorize(credentials) {
    //     /* Retrieve user data */
    //     // Authenticate by API
    //     const user = { id: "xyz", name: "test1234", password: "test1234" }

    //     return user
    //   }
    // })
  ],
  secret: process.env.NEXAUTH_SECRET,
  callbacks: {
    async session ({ session }: any) {
      //create a session on database and store the ID

      console.log('session')
      console.log(session)

      session.user.id = 'fake-id-6GMGpxYI6NIMf7g93EEAcA'

      return session
    },
    async signIn ({ profile }: any) {
      console.log('profile')
      console.log(profile)
      return true
    },
  }
}
