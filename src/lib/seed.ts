import type { Article, Digest, DigestBundle, Tendance } from '@/types'
import type { SectorKey } from '@/lib/sectors'

const SRC_URL: Record<string, string> = {
  'Business of Fashion': 'https://www.businessoffashion.com',
  'Les Échos': 'https://www.lesechos.fr',
  'Vogue Business': 'https://www.voguebusiness.com',
  'Le Journal du Luxe': 'https://journalduluxe.fr',
  "L'ADN": 'https://www.ladn.eu',
  'Beaux-Arts': 'https://www.beauxarts.com',
  'Le Monde': 'https://www.lemonde.fr',
  'Télérama': 'https://www.telerama.fr',
  "Le Quotidien de l'Art": 'https://www.lequotidiendelart.com',
  'Stratégies': 'https://www.strategies.fr',
  'CB News': 'https://www.cbnews.fr',
  'La Réclame': 'https://lareclame.fr',
  'Influencia': 'https://www.influencia.net',
  'LSA': 'https://www.lsa-conso.fr',
  'La Revue du Vin de France': 'https://www.larvf.com',
  'Le Figaro': 'https://www.lefigaro.fr',
  'Terre de Vins': 'https://www.terredevins.com',
  'TechCrunch': 'https://techcrunch.com',
  "It's Nice That": 'https://www.itsnicethat.com',
  'Smashing Magazine': 'https://www.smashingmagazine.com',
  'Figma Blog': 'https://www.figma.com/blog',
  'The Verge': 'https://www.theverge.com',
}

const CURRENT_DIGEST: Digest = {
  id: 'seed-digest-24',
  week_number: 24,
  year: 2026,
  generated_at: '2026-06-15T06:00:00.000Z',
  is_published: true,
}

type SeedArticle = Omit<Article, 'id' | 'digest_id' | 'url'> & { id: string; source: string }

const RAW_ARTICLES: SeedArticle[] = [
  { id: 'l1', sector: 'luxe', is_featured: true, headline: 'Bottega Veneta quitte les réseaux sociaux et mise sur l’intimité', source: 'Business of Fashion', article_date: '2026-06-16', excerpt: 'La maison ferme ses comptes publics pour concentrer sa relation client sur des cercles privés et le print.' },
  { id: 'l2', sector: 'luxe', is_featured: false, headline: 'LVMH structure une cellule IA créative interne', source: 'Les Échos', article_date: '2026-06-15', excerpt: 'Un studio transversal pour outiller les directions artistiques des maisons du groupe.' },
  { id: 'l3', sector: 'luxe', is_featured: false, headline: 'Jacquemus ouvre un café-concept rue Saint-Honoré', source: 'Vogue Business', article_date: '2026-06-17', excerpt: 'Le créateur prolonge son univers en lieu de vie, entre retail et hospitalité.' },
  { id: 'l4', sector: 'luxe', is_featured: false, headline: 'Le quiet luxury cède la place au « loud craft »', source: 'Le Journal du Luxe', article_date: '2026-06-14', excerpt: 'Retour du geste artisanal visible et revendiqué comme signe de valeur.' },
  { id: 'l5', sector: 'luxe', is_featured: false, headline: 'Cartier numérise un siècle d’archives joaillières', source: "L'ADN", article_date: '2026-06-12', excerpt: 'Un fonds de dessins ouvert aux chercheurs et aux ateliers de création.' },
  { id: 'l6', sector: 'luxe', is_featured: false, headline: 'Loro Piana mise sur la traçabilité par blockchain', source: 'Business of Fashion', article_date: '2026-06-11', excerpt: 'Chaque pièce embarque un certificat numérique de provenance des fibres.' },
  { id: 'a1', sector: 'art', is_featured: true, headline: 'La Bourse de Commerce consacre une saison à l’IA générative', source: 'Beaux-Arts', article_date: '2026-06-16', excerpt: 'Une programmation qui interroge l’auteur, la copie et la valeur à l’ère des modèles.' },
  { id: 'a2', sector: 'art', is_featured: false, headline: 'Le Centre Pompidou programme ses années de fermeture hors-les-murs', source: 'Le Monde', article_date: '2026-06-15', excerpt: 'Collections itinérantes et résidences le temps d’un chantier de cinq ans.' },
  { id: 'a3', sector: 'art', is_featured: false, headline: 'Les musées parisiens unifient leur billetterie', source: 'Télérama', article_date: '2026-06-13', excerpt: 'Un passe commun et une interface repensée pour fluidifier la visite.' },
  { id: 'a4', sector: 'art', is_featured: false, headline: 'Art Basel teste un parcours augmenté', source: "Le Quotidien de l'Art", article_date: '2026-06-12', excerpt: 'Une couche numérique discrète pour documenter les œuvres sans écran omniprésent.' },
  { id: 'a5', sector: 'art', is_featured: false, headline: 'Une fondation rachète un fonds photographique inédit', source: 'Beaux-Arts', article_date: '2026-06-10', excerpt: 'Plusieurs milliers de tirages d’un reporter des années 70 entrent en collection.' },
  { id: 'c0', sector: 'com', is_featured: true, headline: 'Cannes Lions 2026 : la première campagne 100 % générée par IA remporte un Lion d’Or', source: 'Stratégies', article_date: '2026-06-17', excerpt: 'Conçue, scénarisée et produite par des modèles, la campagne relance le débat sur la signature créative et l’attribution. Le jury salue « une maîtrise de l’intention plus que de l’outil ».' },
  { id: 'c1', sector: 'com', is_featured: false, headline: 'Le Grand Prix récompense une campagne sans aucun visuel', source: 'CB News', article_date: '2026-06-16', excerpt: 'Une prise de parole entièrement typographique, portée par le rythme et le copywriting.' },
  { id: 'c2', sector: 'com', is_featured: false, headline: 'TikTok teste un format éditorial long', source: 'Influencia', article_date: '2026-06-14', excerpt: 'La plateforme courtise les marques premium avec un récit posé et chapitré.' },
  { id: 'c3', sector: 'com', is_featured: false, headline: 'Les agences indépendantes se regroupent en collectif', source: 'La Réclame', article_date: '2026-06-15', excerpt: 'Mutualiser la production sans perdre la signature : un pari de structure.' },
  { id: 'c4', sector: 'com', is_featured: false, headline: 'L’email retrouve la faveur des annonceurs premium', source: 'Stratégies', article_date: '2026-06-12', excerpt: 'Le canal possédé redevient un terrain d’expression éditoriale soignée.' },
  { id: 'c5', sector: 'com', is_featured: false, headline: 'La RSE s’impose comme critère de pitch', source: 'CB News', article_date: '2026-06-11', excerpt: 'Les annonceurs notent désormais l’empreinte des productions au même titre que l’idée.' },
  { id: 's1', sector: 'spiritueux', is_featured: true, headline: 'Maison Ferrand relance un cognac oublié de 1947', source: 'La Revue du Vin de France', article_date: '2026-06-16', excerpt: 'Un assemblage retrouvé en archives, réédité en série numérotée très confidentielle.' },
  { id: 's2', sector: 'spiritueux', is_featured: false, headline: 'Diageo investit dans le no-low premium', source: 'LSA', article_date: '2026-06-15', excerpt: 'Les alternatives sans alcool montent en gamme et en exigence de goût.' },
  { id: 's3', sector: 'spiritueux', is_featured: false, headline: 'Ruinart confie sa direction artistique à un duo', source: 'Le Figaro', article_date: '2026-06-13', excerpt: 'Un binôme design + scénographie pour réécrire le rituel de dégustation.' },
  { id: 's4', sector: 'spiritueux', is_featured: false, headline: 'Le mezcal artisanal perce à Paris', source: 'Terre de Vins', article_date: '2026-06-12', excerpt: 'Petits producteurs et traçabilité agave séduisent une clientèle curieuse.' },
  { id: 's5', sector: 'spiritueux', is_featured: false, headline: 'Une distillerie normande décroche une médaille internationale', source: 'Terre de Vins', article_date: '2026-06-10', excerpt: 'Le whisky français confirme sa montée en crédibilité à l’export.' },
  { id: 'w1', sector: 'web', is_featured: true, headline: 'Figma rachète un studio de motion pour intégrer l’animation IA', source: 'TechCrunch', article_date: '2026-06-16', excerpt: 'L’éditeur veut générer des transitions et micro-interactions directement dans le canevas.' },
  { id: 'w2', sector: 'web', is_featured: false, headline: 'Une typographie variable open-source fait le buzz', source: "It's Nice That", article_date: '2026-06-15', excerpt: 'Un caractère dont l’axe « grain » simule l’impression, repris par des dizaines de studios.' },
  { id: 'w3', sector: 'web', is_featured: false, headline: 'Le « slow web » inspire une vague de sites éditoriaux', source: 'Smashing Magazine', article_date: '2026-06-14', excerpt: 'Moins de scroll infini, plus de pages tenues et de lecture délibérée.' },
  { id: 'w4', sector: 'web', is_featured: false, headline: 'Les design systems intègrent des tokens génératifs', source: 'Figma Blog', article_date: '2026-06-12', excerpt: 'Des variables pilotées par règles plutôt que figées, pour des thèmes vivants.' },
  { id: 'w5', sector: 'web', is_featured: false, headline: 'WebGPU démocratise la 3D temps réel dans le navigateur', source: 'The Verge', article_date: '2026-06-11', excerpt: 'Des expériences riches sans plug-in, à portée des sites de marque.' },
]

function buildArticles(digestId: string): Article[] {
  return RAW_ARTICLES.map((a) => ({
    ...a,
    id: `${digestId}-${a.id}`,
    digest_id: digestId,
    url: SRC_URL[a.source] || null,
  }))
}

const RAW_TENDANCES: Omit<Tendance, 'id' | 'digest_id'>[] = [
  { sector: 'luxe', project_name: 'Édition Saint-Honoré', studio: 'Atelier Dyakova', description: 'Identité d’un concept-store éphémère, gravée dans le métal.', url: null, image_url: 'https://picsum.photos/seed/sisso-luxe/1200/1200?grayscale' },
  { sector: 'art', project_name: 'Signal', studio: 'Spin', description: 'Signalétique générative d’une exposition, recalculée chaque jour.', url: null, image_url: 'https://picsum.photos/seed/sisso-art/1200/1200?grayscale' },
  { sector: 'com', project_name: 'Contre-forme', studio: 'Bonsoir Paris', description: 'Campagne d’affichage 100 % typographique, sans image.', url: null, image_url: 'https://picsum.photos/seed/sisso-com/1200/1200?grayscale' },
  { sector: 'spiritueux', project_name: 'Cuvée Brut Nature', studio: 'Here Design', description: 'Packaging d’une cuvée bio, étiquette imprimée à l’encre de marc.', url: null, image_url: 'https://picsum.photos/seed/sisso-spirit/1200/1200?grayscale' },
  { sector: 'web', project_name: 'Interface Lente', studio: 'Locomotive', description: 'Site éditorial expérimental, pensé contre le scroll infini.', url: null, image_url: 'https://picsum.photos/seed/sisso-web/1200/1200?grayscale' },
]

function buildTendances(digestId: string): Tendance[] {
  return RAW_TENDANCES.map((t, i) => ({ ...t, id: `${digestId}-trend-${i + 1}`, digest_id: digestId }))
}

export const SEED_BUNDLE: DigestBundle = {
  digest: CURRENT_DIGEST,
  articles: buildArticles(CURRENT_DIGEST.id),
  tendances: buildTendances(CURRENT_DIGEST.id),
}

interface SeedArchiveEntry {
  digest: Digest
  articleCount: number
  headline: string
}

const PAST_EDITIONS: { week: number; year: number; count: number; headline: string }[] = [
  { week: 23, year: 2026, count: 26, headline: 'L’IA s’invite à Cannes Lions, le retail devient expérientiel' },
  { week: 22, year: 2026, count: 24, headline: 'La saison muséale parisienne mise sur le hors-les-murs' },
  { week: 21, year: 2026, count: 28, headline: 'Les maisons de luxe accélèrent sur l’IA générative' },
  { week: 20, year: 2026, count: 23, headline: 'Le retail hybride redessine les codes du marché de l’art' },
  { week: 19, year: 2026, count: 25, headline: 'Le loud craft s’impose face au quiet luxury' },
  { week: 18, year: 2026, count: 22, headline: 'Les fondations privées rachètent les fonds photographiques' },
  { week: 17, year: 2026, count: 27, headline: 'La traçabilité devient un argument de vente premium' },
  { week: 16, year: 2026, count: 24, headline: 'Les archives joaillières s’ouvrent aux chercheurs' },
  { week: 15, year: 2026, count: 21, headline: 'L’hospitalité de marque réinvente le rituel de dégustation' },
  { week: 14, year: 2026, count: 23, headline: 'La direction artistique se réinvente en duo' },
]

export const SEED_ARCHIVES: SeedArchiveEntry[] = PAST_EDITIONS.map((p) => ({
  digest: {
    id: `seed-digest-${p.week}`,
    week_number: p.week,
    year: p.year,
    generated_at: `${p.year}-01-01T06:00:00.000Z`,
    is_published: true,
  },
  articleCount: p.count,
  headline: p.headline,
}))
