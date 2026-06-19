'use client'

import { useRef } from 'react'
import type { Article } from '@/types'
import { sectorByKey } from '@/lib/sectors'
import { formatArticleDate } from '@/lib/date'
import BookmarkButton from '@/components/BookmarkButton'

interface PharesRowProps {
  articles: Article[]
  markedIds: Set<string>
}

export default function PharesRow({ articles, markedIds }: PharesRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  function scroll(dir: number) {
    rowRef.current?.scrollBy({ left: dir * 408, behavior: 'smooth' })
  }

  return (
    <section className="mt-[52px]">
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-2">L’essentiel par secteur</div>
          <h2 className="text-[34px] font-light tracking-[0.015em] mt-2 mb-0 uppercase">Cinq phares, cinq lectures</h2>
        </div>
        <div className="flex gap-[10px]">
          <button onClick={() => scroll(-1)} className="sv-round w-12 h-12 border border-line-2 rounded-full flex items-center justify-center text-[17px]">
            ‹
          </button>
          <button onClick={() => scroll(1)} className="sv-round w-12 h-12 border border-line-2 rounded-full flex items-center justify-center text-[17px]">
            ›
          </button>
        </div>
      </div>
      <div ref={rowRef} className="sv-hscroll flex gap-[18px] overflow-x-auto pt-2 px-0.5 pb-[14px] -mx-0.5" style={{ scrollSnapType: 'x mandatory' }}>
        {articles.map((a) => {
          const sector = sectorByKey(a.sector)
          return (
            <a
              key={a.id}
              href={a.url || '#'}
              target="_blank"
              rel="noopener"
              className="sv-card flex-none w-[372px] h-[464px] relative overflow-hidden rounded-hero p-7 flex flex-col"
              style={{ scrollSnapAlign: 'start', background: '#ABA295', color: '#1b1812' }}
            >
              <span
                className="absolute pointer-events-none font-extrabold leading-none"
                style={{ right: '-8px', top: '-46px', fontSize: '230px', color: 'rgba(27,24,18,0.07)', letterSpacing: '-0.04em' }}
              >
                {sector?.n}
              </span>
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase">
                  {sector?.n} · {sector?.label}
                </span>
                <BookmarkButton articleId={a.id} initialMarked={markedIds.has(a.id)} markedColor="#1b1812" />
              </div>
              <h3 className="relative text-[27px] font-semibold leading-[1.12] mt-[26px] mb-0" style={{ letterSpacing: '-0.025em', textWrap: 'balance' }}>
                {a.headline}
              </h3>
              <p className="relative text-sm leading-[1.5] mt-[14px] mb-0" style={{ color: '#3a362c' }}>
                {a.excerpt}
              </p>
              <div className="flex-1" />
              <div className="relative flex items-end justify-between">
                <span className="font-mono text-[11px] tracking-[0.06em] uppercase" style={{ color: '#3a362c' }}>
                  {a.source} · {formatArticleDate(a.article_date)}
                </span>
                <span className="sv-arrow w-[42px] h-[42px] rounded-full flex items-center justify-center text-base" style={{ background: '#1b1812', color: '#F3F1EC' }}>
                  ↗
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
