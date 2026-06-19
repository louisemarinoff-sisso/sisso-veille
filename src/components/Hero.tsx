import Image from 'next/image'
import type { Article } from '@/types'
import { sectorByKey } from '@/lib/sectors'
import { formatArticleDate } from '@/lib/date'
import BookmarkButton from '@/components/BookmarkButton'

interface HeroProps {
  article: Article
  weekNumber: number
  marked: boolean
}

export default function Hero({ article, weekNumber, marked }: HeroProps) {
  const sector = sectorByKey(article.sector)

  return (
    <a
      href={article.url || '#'}
      target="_blank"
      rel="noopener"
      className="sv-card sv-hero relative block h-[66vh] min-h-[540px] rounded-hero overflow-hidden"
      style={{ background: '#262219' }}
    >
      <Image
        src={`https://picsum.photos/seed/sisso-hero-${weekNumber}/1700/1050?grayscale`}
        alt={article.headline}
        fill
        priority
        sizes="100vw"
        className="sv-zoom object-cover"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,19,15,0.5) 0%, rgba(20,19,15,0.28) 30%, rgba(20,19,15,0.42) 60%, rgba(20,19,15,0.92) 100%)',
        }}
      />
      <div className="absolute inset-0 px-[42px] py-[38px] flex flex-col justify-between text-on-dark">
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[11px] tracking-[0.18em] uppercase rounded-[30px] px-[13px] py-[7px] border"
            style={{ background: 'rgba(243,241,236,0.14)', backdropFilter: 'blur(6px)', borderColor: 'rgba(243,241,236,0.25)' }}
          >
            Semaine N°{weekNumber} — À la une
          </span>
          <BookmarkButton articleId={article.id} initialMarked={marked} variant="hero" />
        </div>
        <div className="max-w-[1000px]">
          <div className="font-mono text-xs tracking-[0.1em] uppercase opacity-[.82] mb-4">
            {sector?.n} · {sector?.label} &nbsp;—&nbsp; {article.source} · {formatArticleDate(article.article_date)}
          </div>
          <h1
            className="font-sans uppercase leading-[1.02] m-0"
            style={{ fontSize: 'clamp(38px, 5.4vw, 82px)', fontWeight: 300, letterSpacing: '0.01em', textWrap: 'balance' }}
          >
            {article.headline}
          </h1>
          <div className="flex items-end justify-between gap-[30px] mt-[22px]">
            <p className="font-sub italic text-[21px] leading-[1.4] opacity-[.92] m-0 max-w-[54ch]">
              {article.excerpt}
            </p>
            <span className="sv-uline font-mono text-xs tracking-[0.06em] uppercase whitespace-nowrap font-medium">
              Lire l’article ↗
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}
