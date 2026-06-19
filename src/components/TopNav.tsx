'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TopNavProps {
  editionLabel: string
  selectionsCount: number
}

const LINKS = [
  { href: '/', label: 'Cette semaine' },
  { href: '/archives', label: 'Archives' },
  { href: '/selections', label: 'Sélections' },
]

export default function TopNav({ editionLabel, selectionsCount }: TopNavProps) {
  const pathname = usePathname()

  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-3 py-2 pb-[22px]">
      <Link href="/" className="justify-self-start flex items-baseline gap-[11px]">
        <span className="text-[23px] font-normal tracking-[0.05em] leading-none uppercase">SISSO VEILLE</span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">®</span>
      </Link>
      <div className="justify-self-center font-mono text-[11px] tracking-[0.16em] text-ink-2 uppercase text-center">
        {editionLabel}
      </div>
      <div className="justify-self-end flex items-center gap-[26px]">
        {LINKS.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="sv-uline text-sm font-medium inline-flex items-center gap-1.5 whitespace-nowrap"
              style={{ color: active ? '#16150f' : '#6e6b62' }}
            >
              {item.label}
              {item.href === '/selections' && selectionsCount > 0 && (
                <span className="font-mono text-[10px] border border-line-2 rounded-[20px] px-[6px] py-[1px] text-ink">
                  {selectionsCount}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
