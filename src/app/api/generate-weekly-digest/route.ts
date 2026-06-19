import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateWeeklyDigestContent } from '@/lib/anthropic'
import { currentIsoWeek } from '@/lib/date'
import { SEED_BUNDLE } from '@/lib/seed'

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const header = req.headers.get('x-cron-secret')
  const query = req.nextUrl.searchParams.get('secret')
  return header === secret || query === secret
}

async function handle(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase non configuré (SUPABASE_SERVICE_ROLE_KEY manquante).' }, { status: 500 })
  }

  const seed = req.nextUrl.searchParams.get('seed') === 'true'

  try {
    const { week, year } = currentIsoWeek()

    const { data: digest, error: digestError } = await supabaseAdmin
      .from('digests')
      .insert({ week_number: week, year, is_published: true })
      .select()
      .single()
    if (digestError) throw digestError

    if (seed) {
      const articles = SEED_BUNDLE.articles.map((a) => ({
        digest_id: digest.id,
        sector: a.sector,
        is_featured: a.is_featured,
        headline: a.headline,
        source: a.source,
        url: a.url,
        excerpt: a.excerpt,
        article_date: a.article_date,
      }))
      const tendances = SEED_BUNDLE.tendances.map((t) => ({
        digest_id: digest.id,
        sector: t.sector,
        project_name: t.project_name,
        studio: t.studio,
        description: t.description,
        url: t.url,
        image_url: t.image_url,
      }))
      const [articlesRes, tendancesRes] = await Promise.all([
        supabaseAdmin.from('articles').insert(articles),
        supabaseAdmin.from('tendances').insert(tendances),
      ])
      if (articlesRes.error) throw articlesRes.error
      if (tendancesRes.error) throw tendancesRes.error
      return NextResponse.json({ ok: true, seeded: true, digest })
    }

    const content = await generateWeeklyDigestContent()

    const articles = content.articles.map((a) => ({ digest_id: digest.id, ...a }))
    const tendances = content.tendances.map((t) => ({
      digest_id: digest.id,
      ...t,
      image_url: t.image_url || `https://picsum.photos/seed/sisso-${t.sector}-${week}/1200/1200?grayscale`,
    }))

    const [articlesRes, tendancesRes] = await Promise.all([
      supabaseAdmin.from('articles').insert(articles),
      supabaseAdmin.from('tendances').insert(tendances),
    ])
    if (articlesRes.error) throw articlesRes.error
    if (tendancesRes.error) throw tendancesRes.error

    return NextResponse.json({ ok: true, digest, articleCount: articles.length, tendanceCount: tendances.length })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export { handle as GET, handle as POST }
