import { getArchives, getCurrentDigestBundle } from '@/lib/data'
import { formatArchiveRange } from '@/lib/date'

export default async function ArchivesPage() {
  const current = await getCurrentDigestBundle()
  const archives = await getArchives(current.digest.id)

  return (
    <div className="pt-6">
      <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-2">Toutes les éditions</div>
      <h1 className="text-[44px] sm:text-[84px] font-light tracking-[0.006em] leading-[.97] uppercase mt-3.5 mb-10">
        Archives
      </h1>
      <div className="flex flex-col gap-3">
        {archives.map((e) => (
          <div
            key={e.digest.id}
            className="sv-card grid items-center gap-6 px-[30px] py-[26px] bg-white border border-line rounded-card"
            style={{ gridTemplateColumns: '130px 240px 1fr auto' }}
          >
            <span className="text-[32px] font-semibold" style={{ letterSpacing: '-0.03em' }}>
              N°{e.digest.week_number}
            </span>
            <span className="font-mono text-xs text-ink-2">{formatArchiveRange(e.digest.week_number, e.digest.year)}</span>
            <span className="text-[15px] text-ink-2 leading-[1.4]">{e.headline}</span>
            <span className="font-mono text-[11px] text-ink-3 text-right">{e.articleCount} ART.</span>
          </div>
        ))}
      </div>
    </div>
  )
}
