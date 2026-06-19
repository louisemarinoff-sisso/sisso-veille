export type SectorKey = 'luxe' | 'art' | 'com' | 'spiritueux' | 'web'

export interface Sector {
  idx: number
  n: string
  key: SectorKey
  label: string
  desc: string
}

export const SECTORS: Sector[] = [
  { idx: 1, n: '01', key: 'luxe', label: 'LUXE', desc: 'Maisons, savoir-faire, retail & désir.' },
  { idx: 2, n: '02', key: 'art', label: 'ART & CULTURE', desc: 'Institutions, expositions, marché de l’art.' },
  { idx: 3, n: '03', key: 'com', label: 'COMMUNICATION', desc: 'Campagnes, agences, médias & influence.' },
  { idx: 4, n: '04', key: 'spiritueux', label: 'SPIRITUEUX', desc: 'Vins, spiritueux & art de recevoir.' },
  { idx: 5, n: '05', key: 'web', label: 'WEB & DIGITAL', desc: 'Produit, IA, design d’interface & tech.' },
]

export function sectorByKey(key: string): Sector | undefined {
  return SECTORS.find((s) => s.key === key)
}

export function sectorByLabel(label: string): Sector | undefined {
  return SECTORS.find((s) => s.label === label || s.label.toLowerCase() === label.toLowerCase())
}
