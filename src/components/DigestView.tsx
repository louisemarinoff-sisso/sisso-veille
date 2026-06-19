import Hero from '@/components/Hero'
import SectorChips from '@/components/SectorChips'
import PharesRow from '@/components/PharesRow'
import CahierTendances from '@/components/CahierTendances'
import EnBref from '@/components/EnBref'
import { deriveHomeSelections } from '@/lib/data'
import type { DigestBundle } from '@/types'

interface DigestViewProps {
  bundle: DigestBundle
  markedIds: Set<string>
}

export default function DigestView({ bundle, markedIds }: DigestViewProps) {
  const { hero, phares, secondary } = deriveHomeSelections(bundle.articles)

  return (
    <div>
      {hero && <Hero article={hero} weekNumber={bundle.digest.week_number} marked={markedIds.has(hero.id)} />}
      <SectorChips />
      <PharesRow articles={phares} markedIds={markedIds} />
      <CahierTendances tendances={bundle.tendances} />
      <EnBref articles={secondary} />
    </div>
  )
}
