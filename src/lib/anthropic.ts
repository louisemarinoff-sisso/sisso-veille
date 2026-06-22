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

// Le modèle retombe parfois sur la page d'accueil d'un média (ex: lejournaldesarts.fr,
// fashionunited.fr) plutôt que l'article précis. On filtre ces URLs invalides après coup
// plutôt que de se fier uniquement à la consigne du prompt.
function isHomepageUrl(url: string | undefined | null): boolean {
  if (!url) return true
  try {
    const { pathname, search } = new URL(url)
    const meaningfulPath = pathname.replace(/\/+$/, '')
    return meaningfulPath === '' && !search
  } catch {
    return true
  }
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

Fais une recherche web dédiée pour CHAQUE actualité individuelle (pas seulement pour celle à la une) afin de vérifier son URL précise avant de l'inclure — ne te contente pas d'une recherche générale par secteur.

Réponds UNIQUEMENT avec un objet JSON strict de cette forme, sans texte autour :
{
  "articles": [
    { "sector": "luxe|art|com|spiritueux|web", "headline": "...", "source": "...", "url": "https://...", "excerpt": "1-2 phrases en français", "article_date": "YYYY-MM-DD", "is_featured": false }
  ],
  "tendances": [
    { "sector": "luxe|art|com|spiritueux|web", "project_name": "...", "studio": "...", "description": "1 phrase en français", "url": "https://...", "image_url": "" }
  ]
}

"tendances" doit contenir exactement 5 entrées, une par secteur.

Règle stricte sur les URLs : pour chaque "url", copie EXACTEMENT l'adresse complète de la page d'article retournée par l'outil de recherche web (le lien profond vers l'article précis, avec son slug/chemin complet), jamais la page d'accueil du média ni un domaine nu (ex: pas "https://www.vogue.fr" mais bien "https://www.vogue.fr/article/nom-de-larticle-precis"). Cette règle s'applique à TOUS les médias sans exception, y compris FashionUnited et Le Journal des Arts : ne renvoie jamais "https://fashionunited.fr", "https://www.fashionunited.fr/", "https://www.lejournaldesarts.fr" ou "https://www.lejournaldesarts.fr/" seuls — trouve et vérifie le chemin complet de l'article (ex: "https://www.lejournaldesarts.fr/marche/...", "https://fashionunited.fr/actualite/..."). Si après recherche tu ne trouves qu'un lien racine ou que tu n'es pas certain du chemin exact, n'invente rien et exclus complètement cette actualité de la liste plutôt que de mettre un lien vers la page d'accueil.`

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 35 } as never],
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => (block as { text: string }).text)
    .join('\n')
  if (!text) throw new Error('Aucune réponse texte du modèle.')

  const parsed = extractJson(text)
  return {
    articles: parsed.articles.filter((a) => !isHomepageUrl(a.url)),
    tendances: parsed.tendances.filter((t) => !isHomepageUrl(t.url)),
  }
}
