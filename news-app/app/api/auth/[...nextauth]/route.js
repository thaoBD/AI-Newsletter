import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito";

const handler = NextAuth.default({
    providers: [
        CognitoProvider.default({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: process.env.COGNITO_ISSUER,
            redirect_uris: process.env.COGNITO_REDIRECT,
            checks: ['nonce']
          })        
      ],
      callbacks: {
        async jwt({ token, account, user }) {       
            if (account) { token.sub = user.id }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
      },
      session: {
        strategy: "jwt",
        jwt: true,
      }
})

export { handler as GET, handler as POST }