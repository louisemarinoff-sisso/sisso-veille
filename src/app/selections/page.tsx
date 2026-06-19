import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getBookmarkedArticles } from '@/lib/data'
import SelectionsList from '@/components/SelectionsList'
import SignInButton from '@/components/SignInButton'

export default async function SelectionsPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  const articles = email ? await getBookmarkedArticles(email) : []

  return (
    <div className="pt-6">
      <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-2">Vos articles gardés</div>
      <h1 className="text-[44px] sm:text-[84px] font-light tracking-[0.006em] leading-[.97] uppercase mt-3.5 mb-10">
        Sélections{' '}
        {articles.length > 0 && (
          <span className="text-ink-3" style={{ fontSize: '0.5em' }}>
            {articles.length}
          </span>
        )}
      </h1>

      {!email ? (
        <div className="border border-line bg-white rounded-hero px-10 py-20 text-center">
          <div className="font-mono text-[13px] tracking-[0.06em] text-ink-2">CONNEXION REQUISE</div>
          <p className="text-base text-ink-3 mt-3.5 mx-auto max-w-[44ch] leading-[1.5]">
            Connectez-vous avec votre compte Google Sisso pour garder des articles et consulter votre sélection.
          </p>
          <SignInButton />
        </div>
      ) : articles.length === 0 ? (
        <div className="border border-line bg-white rounded-hero px-10 py-20 text-center">
          <div className="font-mono text-[13px] tracking-[0.06em] text-ink-2">AUCUN ARTICLE GARDÉ</div>
          <p className="text-base text-ink-3 mt-3.5 mx-auto max-w-[44ch] leading-[1.5]">
            Touchez ＋ Garder sur n’importe quelle carte pour constituer votre sélection de la semaine.
          </p>
        </div>
      ) : (
        <SelectionsList initialArticles={articles} />
      )}
    </div>
  )
}
