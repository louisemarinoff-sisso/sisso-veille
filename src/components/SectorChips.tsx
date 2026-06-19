import Link from 'next/link'
import { SECTORS } from '@/lib/sectors'

export default function SectorChips() {
  return (
    <div className="sv-hscroll flex gap-[10px] overflow-x-auto pt-7 px-0.5 pb-1.5">
      {SECTORS.map((s) => (
        <Link
          key={s.key}
          href={`/secteur/${s.key}`}
          className="sv-pill flex-none flex items-center gap-[9px] px-[18px] py-[11px] border rounded-chip bg-canvas"
        >
          <span className="font-mono text-[11px] text-ink-3">{s.n}</span>
          <span className="text-[13.5px] font-medium tracking-[0.01em]">{s.label}</span>
        </Link>
      ))}
    </div>
  )
}
