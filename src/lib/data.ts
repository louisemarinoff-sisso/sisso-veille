import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { SECTORS, type SectorKey } from '@/lib/sectors'
import { SEED_BUNDLE, SEED_ARCHIVES } from '@/lib/seed'
import type { Article, Digest, DigestBundle, Tendance } from '@/types'

export interface ArchiveEntry {
  digest: Digest
  articleCount: number
  headline: string
}

async function fetchBundleByDigest(digest: Digest): Promise<DigestBundle> {
  if (!supabase) return SEED_BUNDLE
  const [articlesRes, tendancesRes] = await Promise.all([
    supabase.from('articles').select('*').eq('digest_id', digest.id).order('article_date', { ascending: false }),
    supabase.from('tendances').select('*').eq('digest_id', digest.id),
  ])
  const articles = (articlesRes.data as Article[]) || []
  const tendances = (tendancesRes.data as Tendance[]) || []
  if (articles.length === 0) return SEED_BUNDLE
  return { digest, articles, tendances }
}

export async function getCurrentDigestBundle(): Promise<DigestBundle> {
  if (!isSupabaseConfigured || !supabase) return SEED_BUNDLE
  const { data } = await supabase
    .from('digests')
    .select('*')
    .eq('is_published', true)
    .order('year', { ascending: false })
    .order('week_number', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (!data) return SEED_BUNDLE
  return fetchBundleByDigest(data as Digest)
}

export async function getDigestBundleByWeekYear(week: number, year: number): Promise<DigestBundle | null> {
  if (!isSupabaseConfigured || !supabase) {
    return SEED_BUNDLE.digest.week_number === week && SEED_BUNDLE.digest.year === year ? SEED_BUNDLE : null
  }
  const { data } = await supabase
    .from('digests')
    .select('*')
    .eq('week_number', week)
    .eq('year', year)
    .eq('is_published', true)
    .maybeSingle()
  if (!data) return null
  return fetchBundleByDigest(data as Digest)
}

export async function getArchives(excludeDigestId?: string): Promise<ArchiveEntry[]> {
  if (!isSupabaseConfigured || !supabase) return SEED_ARCHIVES
  const client = supabase

  const { data: digests } = await client
    .from('digests')
    .select('*')
    .eq('is_published', true)
    .order('year', { ascending: false })
    .order('week_number', { ascending: false })

  if (!digests || digests.length === 0) return SEED_ARCHIVES

  const entries = await Promise.all(
    (digests as Digest[])
      .filter((d) => d.id !== excludeDigestId)
      .map(async (digest) => {
        const { data: articles } = await client
          .from('articles')
          .select('headline, is_featured')
          .eq('digest_id', digest.id)
        const list = (articles as Pick<Article, 'headline' | 'is_featured'>[]) || []
        const featured = list.find((a) => a.is_featured)
        return { digest, articleCount: list.length, headline: featured?.headline || list[0]?.headline || '' }
      })
  )
  return entries
}

/**
 * The schema only tracks one flag (is_featured). The week's single "à la une" hero is the
 * one featured article; each sector's "phare" is its most recent non-hero article. Everything
 * else becomes the flat "En bref" list on the home page.
 */
export function deriveHomeSelections(articles: Article[]) {
  const hero = articles.find((a) => a.is_featured) || articles[0]
  const phares = SECTORS.map((s) => {
    const sectorArticles = articles.filter((a) => a.sector === s.key && a.id !== hero?.id)
    return sectorArticles.find((a) => a.is_featured) || sectorArticles[0]
  }).filter((a): a is Article => Boolean(a))
  const usedIds = new Set([hero?.id, ...phares.map((a) => a.id)].filter(Boolean))
  const secondary = articles.filter((a) => !usedIds.has(a.id))
  return { hero, phares, secondary }
}

export function articlesBySector(articles: Article[], sector: SectorKey): Article[] {
  return articles.filter((a) => a.sector === sector)
}

export async function getBookmarkedArticleIds(userEmail: string): Promise<string[]> {
  if (!supabase) return []
  const { data } = await supabase.from('bookmarks').select('article_id').eq('user_email', userEmail)
  return (data || []).map((b: { article_id: string }) => b.article_id)
}

export async function getBookmarkedArticles(userEmail: string): Promise<Article[]> {
  if (!supabase) return []
  const { data } = await supabase
    .from('bookmarks')
    .select('article:articles(*)')
    .eq('user_email', userEmail)
    .order('saved_at', { ascending: false })
  return ((data || []) as unknown as { article: Article | null }[])
    .map((b) => b.article)
    .filter((a): a is Article => Boolean(a))
}
