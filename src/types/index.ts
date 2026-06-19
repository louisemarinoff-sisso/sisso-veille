import type { SectorKey } from '@/lib/sectors'

export interface Digest {
  id: string
  week_number: number
  year: number
  generated_at: string
  is_published: boolean
}

export interface Article {
  id: string
  digest_id: string
  sector: SectorKey
  is_featured: boolean
  headline: string
  source: string | null
  url: string | null
  excerpt: string | null
  article_date: string | null
}

export interface Tendance {
  id: string
  digest_id: string
  sector: SectorKey
  project_name: string
  studio: string | null
  description: string | null
  url: string | null
  image_url: string | null
}

export interface Bookmark {
  id: string
  user_email: string
  article_id: string
  saved_at: string
}

export interface DigestBundle {
  digest: Digest
  articles: Article[]
  tendances: Tendance[]
}
