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
      ]
})

export { handler as GET, handler as POST }