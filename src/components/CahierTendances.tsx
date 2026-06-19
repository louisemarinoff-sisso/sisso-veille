'use client'

import { useRef } from 'react'
import Image from 'next/image'
import type { Tendance } from '@/types'
import { sectorByKey } from '@/lib/sectors'

export default function CahierTendances({ tendances }: { tendances: Tendance[] }) {
  const rowRef = useRef<HTMLDivElement>(null)

  function scroll(dir: number) {
    rowRef.current?.scrollBy({ left: dir * 408, behavior: 'smooth' })
  }

  return (
    <section className="mt-[60px]">
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-2">Cahier des tendances</div>
          <h2 className="text-[34px] font-light tracking-[0.015em] mt-2 mb-0 uppercase">Un projet créatif par secteur</h2>
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
        {tendances.map((t, i) => {
          const sector = sectorByKey(t.sector)
          const card = (
            <div
              key={t.id}
              className="sv-card flex-none w-[560px] h-[540px] relative overflow-hidden rounded-hero"
              style={{ scrollSnapAlign: 'start', background: '#262219' }}
            >
              <Image
                src={t.image_url || `https://picsum.photos/seed/sisso-${t.sector}/1200/1200?grayscale`}
                alt={t.project_name}
                fill
                sizes="560px"
                className="sv-zoom object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(20,19,15,.5) 0%, rgba(20,19,15,.08) 32%, rgba(20,19,15,.45) 66%, rgba(20,19,15,.92) 100%)',
                }}
              />
              <div className="absolute inset-0 p-[30px] flex flex-col justify-between text-on-dark">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[11px] tracking-[0.1em] uppercase rounded-[30px] px-3 py-1.5 border"
                    style={{ background: 'rgba(243,241,236,0.14)', backdropFilter: 'blur(6px)', borderColor: 'rgba(243,241,236,0.25)' }}
                  >
                    {sector?.n} · {sector?.label}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-80">
                    Tendance {sector?.n} / 05
                  </span>
                </div>
                <div>
                  <h3 className="font-sans uppercase leading-[1.02] m-0 text-[36px] font-light" style={{ letterSpacing: '0.01em' }}>
                    {t.project_name}
                  </h3>
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase opacity-[.85] mt-3">{t.studio}</div>
                  <p className="font-sub italic text-[17px] leading-[1.4] opacity-[.92] mt-3 mb-0 max-w-[40ch]">
                    {t.description}
                  </p>
                </div>
              </div>
            </div>
          )
          return t.url ? (
            <a key={t.id} href={t.url} target="_blank" rel="noopener" className="contents">
              {card}
            </a>
          ) : (
            card
          )
        })}
      </div>
    </section>
  )
}
