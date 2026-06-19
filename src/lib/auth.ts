import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || 'sisso.fr'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false
      return user.email.toLowerCase().endsWith(`@${allowedDomain.toLowerCase()}`)
    },
    async session({ session }) {
      return session
    },
  },
  pages: {
    signIn: '/selections',
  },
}
