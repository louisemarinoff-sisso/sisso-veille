import type { Article } from '@/types'
import { sectorByKey } from '@/lib/sectors'
import { formatArticleDate } from '@/lib/date'

export default function EnBref({ articles }: { articles: Article[] }) {
  return (
    <section className="mt-[60px]">
      <div className="flex items-end justify-between gap-6 mb-[22px]">
        <div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-2">En bref</div>
          <h2 className="text-[34px] font-light tracking-[0.015em] mt-2 mb-0 uppercase">Le reste de la semaine</h2>
        </div>
      </div>
      <div className="bg-white border border-line rounded-hero px-[26px] py-[10px]">
        {articles.map((a) => {
          const sector = sectorByKey(a.sector)
          return (
            <a
              key={a.id}
              href={a.url || '#'}
              target="_blank"
              rel="noopener"
              className="grid items-center gap-6 py-[21px] border-b border-line hover:opacity-[.62]"
              style={{ gridTemplateColumns: '66px 168px 1fr auto' }}
            >
              <span className="font-mono text-xs text-ink-3">{formatArticleDate(a.article_date)}</span>
              <span className="font-mono text-[10px] tracking-[0.08em] text-ink-2">
                {sector?.n} · {sector?.label}
              </span>
              <span className="text-[19px] font-medium leading-[1.25]" style={{ letterSpacing: '-0.02em' }}>
                {a.headline}
              </span>
              <span className="font-mono text-[11px] text-ink-2 text-right whitespace-nowrap">{a.source} ↗</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
