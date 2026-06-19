import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getCurrentDigestBundle, getBookmarkedArticleIds, articlesBySector } from '@/lib/data'
import { sectorByKey } from '@/lib/sectors'
import { formatArticleDate } from '@/lib/date'
import BookmarkButton from '@/components/BookmarkButton'

const PER_PAGE = 4

export default async function SectorPage({
  params,
  searchParams,
}: {
  params: { sector: string }
  searchParams: { page?: string }
}) {
  const sector = sectorByKey(params.sector)
  if (!sector) notFound()

  const bundle = await getCurrentDigestBundle()
  const session = await getServerSession(authOptions)
  const markedIds = session?.user?.email
    ? new Set(await getBookmarkedArticleIds(session.user.email))
    : new Set<string>()

  const all = articlesBySector(bundle.articles, sector.key)
  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE))
  const page = Math.min(Math.max(1, Number(searchParams.page) || 1), totalPages)
  const paged = all.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="pt-6">
      <div className="flex items-end justify-between gap-[30px] flex-wrap mb-10">
        <div>
          <div className="font-mono text-[13px] tracking-[0.12em] text-ink-3">SECTEUR {sector.n}</div>
          <h1 className="text-[44px] sm:text-[84px] font-light tracking-[0.006em] leading-[.97] uppercase mt-3">
            {sector.label}
          </h1>
          <p className="font-sub italic text-[19px] text-ink-2 mt-4">{sector.desc}</p>
        </div>
        <div className="font-mono text-[11px] text-ink-2 text-right leading-[1.9]">
          <div className="text-ink text-sm">{all.length} articles</div>
          <div>Semaine N°{bundle.digest.week_number}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[18px]">
        {paged.map((a) => (
          <a
            key={a.id}
            href={a.url || '#'}
            target="_blank"
            rel="noopener"
            className="sv-card border border-line rounded-card bg-white p-7 flex flex-col min-h-[200px]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] tracking-[0.1em] text-ink-2">
                {a.source} · {formatArticleDate(a.article_date)}
              </span>
              <BookmarkButton articleId={a.id} initialMarked={markedIds.has(a.id)} />
            </div>
            <h3 className="text-[23px] font-semibold leading-[1.14] m-0" style={{ letterSpacing: '-0.025em' }}>
              {a.headline}
            </h3>
            <p className="text-[14.5px] leading-[1.5] text-ink-2 mt-3.5 mb-0">{a.excerpt}</p>
            <div className="flex-1 min-h-4" />
            <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-ink-2">Lire la source ↗</span>
          </a>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-[38px] font-mono">
          <span className="text-[10px] tracking-[0.14em] text-ink-3 uppercase mr-1.5">Page</span>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/secteur/${sector.key}?page=${p}`}
              className="w-10 h-10 border border-line-2 rounded-[12px] flex items-center justify-center text-xs"
              style={{ color: p === page ? '#fff' : '#16150f', background: p === page ? '#16150f' : 'transparent' }}
            >
              {String(p).padStart(2, '0')}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
