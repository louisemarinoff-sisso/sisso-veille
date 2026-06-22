import Anthropic from '@anthropic-ai/sdk'
import { SECTORS } from '@/lib/sectors'
import type { SectorKey } from '@/lib/sectors'

export interface GeneratedArticle {
  sector: SectorKey
  headline: string
  source: string
  url: string
  excerpt: string
  article_date: string
  is_featured: boolean
}

export interface GeneratedTendance {
  sector: SectorKey
  project_name: string
  studio: string
  description: string
  url: string
  image_url: string
}

export interface GeneratedDigest {
  articles: GeneratedArticle[]
  tendances: GeneratedTendance[]
}

const MODEL = 'claude-sonnet-4-6'

function extractJson(text: string): GeneratedDigest {
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('Réponse du modèle sans bloc JSON exploitable.')
  return JSON.parse(match[0]) as GeneratedDigest
}

export async function generateWeeklyDigestContent(): Promise<GeneratedDigest> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY manquante.')

  const client = new Anthropic({ apiKey })
  const sectorList = SECTORS.map((s) => `- ${s.key} (${s.label}) : ${s.desc}`).join('\n')

  const prompt = `Tu es l'agent de veille créative de "Sisso Veille", la plateforme d'intelligence créative de l'agence de communication parisienne Sisso.

Cherche les actualités les plus pertinentes de la semaine écoulée pour chacun des 5 secteurs suivants :
${sectorList}

Pour chaque secteur, identifie 4 à 6 actualités réelles et récentes (campagnes, lancements, nominations, ouvertures, mouvements de marché) et UN projet créatif notable à mettre en avant dans le "Cahier des tendances" (identité visuelle, packaging, campagne, site, scénographie...).

Choisis UNE SEULE actualité, parmi tout le lot, comme "à la une" de la semaine (is_featured: true) — la plus marquante transversalement. Toutes les autres ont is_featured: false.

Réponds UNIQUEMENT avec un objet JSON strict de cette forme, sans texte autour :
{
  "articles": [
    { "sector": "luxe|art|com|spiritueux|web", "headline": "...", "source": "...", "url": "https://...", "excerpt": "1-2 phrases en français", "article_date": "YYYY-MM-DD", "is_featured": false }
  ],
  "tendances": [
    { "sector": "luxe|art|com|spiritueux|web", "project_name": "...", "studio": "...", "description": "1 phrase en français", "url": "https://...", "image_url": "" }
  ]
}

"tendances" doit contenir exactement 5 entrées, une par secteur. Les URLs doivent être réelles et vérifiées via la recherche web.`

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 10 } as never],
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => (block as { text: string }).text)
    .join('\n')
  if (!text) throw new Error('Aucune réponse texte du modèle.')

  return extractJson(text)
}
