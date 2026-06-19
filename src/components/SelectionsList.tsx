'use client'

import { useState } from 'react'
import type { Article } from '@/types'
import { sectorByKey } from '@/lib/sectors'
import { formatArticleDate } from '@/lib/date'
import BookmarkButton from '@/components/BookmarkButton'

export default function SelectionsList({ initialArticles }: { initialArticles: Article[] }) {
  const [articles, setArticles] = useState(initialArticles)

  if (articles.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      {articles.map((a) => {
        const sector = sectorByKey(a.sector)
        return (
          <div
            key={a.id}
            className="sv-card grid items-center gap-[22px] px-[30px] py-6 bg-white border border-line rounded-card"
            style={{ gridTemplateColumns: '66px 168px 1fr auto auto' }}
          >
            <span className="font-mono text-xs text-ink-3">{formatArticleDate(a.article_date)}</span>
            <span className="font-mono text-[10px] tracking-[0.08em] text-ink-2">
              {sector?.n} · {sector?.label}
            </span>
            <a
              href={a.url || '#'}
              target="_blank"
              rel="noopener"
              className="text-[18px] font-medium leading-[1.25]"
              style={{ letterSpacing: '-0.02em' }}
            >
              {a.headline}
            </a>
            <span className="font-mono text-[11px] text-ink-2 whitespace-nowrap">{a.source}</span>
            <BookmarkButton
              articleId={a.id}
              initialMarked
              variant="remove"
              onToggled={(marked) => {
                if (!marked) setArticles((prev) => prev.filter((x) => x.id !== a.id))
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
