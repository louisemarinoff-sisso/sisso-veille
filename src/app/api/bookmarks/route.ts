import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ articleIds: [] })
  if (!supabaseAdmin) return NextResponse.json({ articleIds: [] })

  const { data } = await supabaseAdmin.from('bookmarks').select('article_id').eq('user_email', session.user.email)
  return NextResponse.json({ articleIds: (data || []).map((b) => b.article_id) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Connexion requise.' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase non configuré.' }, { status: 500 })
  }

  const { articleId } = await req.json()
  if (!articleId) return NextResponse.json({ error: 'articleId manquant.' }, { status: 400 })

  const userEmail = session.user.email
  const { data: existing } = await supabaseAdmin
    .from('bookmarks')
    .select('id')
    .eq('user_email', userEmail)
    .eq('article_id', articleId)
    .maybeSingle()

  if (existing) {
    await supabaseAdmin.from('bookmarks').delete().eq('id', existing.id)
    return NextResponse.json({ marked: false })
  }

  await supabaseAdmin.from('bookmarks').insert({ user_email: userEmail, article_id: articleId })
  return NextResponse.json({ marked: true })
}
