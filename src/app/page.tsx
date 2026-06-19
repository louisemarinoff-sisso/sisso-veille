import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getCurrentDigestBundle, getBookmarkedArticleIds } from '@/lib/data'
import DigestView from '@/components/DigestView'

export default async function HomePage() {
  const bundle = await getCurrentDigestBundle()
  const session = await getServerSession(authOptions)
  const markedIds = session?.user?.email
    ? new Set(await getBookmarkedArticleIds(session.user.email))
    : new Set<string>()

  return <DigestView bundle={bundle} markedIds={markedIds} />
}
