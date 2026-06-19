import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import './globals.css'
import { authOptions } from '@/lib/auth'
import { getCurrentDigestBundle, getBookmarkedArticleIds } from '@/lib/data'
import { formatEditionRange } from '@/lib/date'
import AuthSessionProvider from '@/components/AuthSessionProvider'
import Shell from '@/components/Shell'

export const metadata: Metadata = {
  title: 'Sisso Veille — Intelligence créative',
  description: 'Plateforme de veille créative hebdomadaire alimentée par IA pour l’agence Sisso.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { digest } = await getCurrentDigestBundle()
  const session = await getServerSession(authOptions)
  const selectionsCount = session?.user?.email ? (await getBookmarkedArticleIds(session.user.email)).length : 0
  const editionLabel = `Édition N°${digest.week_number} — ${formatEditionRange(digest.week_number, digest.year)}`

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@1,6..72,300;1,6..72,400;1,6..72,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthSessionProvider>
          <Shell editionLabel={editionLabel} selectionsCount={selectionsCount}>
            {children}
          </Shell>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
