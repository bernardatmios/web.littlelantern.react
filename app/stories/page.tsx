import type { Metadata } from 'next'
import { client, StoryBook } from '@/lib/sanity'
import { getLocale, getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import StoryLibrary from '@/components/StoryLibrary'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.littlelantern.kids'

export const metadata: Metadata = {
  title: 'Story Library',
  description: 'Browse bilingual bedtime stories by age and access type.',
  alternates: { canonical: '/stories' },
  openGraph: {
    type: 'website',
    url: '/stories',
    title: 'Story Library | Little Lanterns',
    description: 'Browse bilingual bedtime stories by age and access type.',
  },
  twitter: {
    card: 'summary',
    title: 'Story Library | Little Lanterns',
    description: 'Browse bilingual bedtime stories by age and access type.',
  },
}

async function getStories(): Promise<StoryBook[]> {
  const query = `*[_type == "storyBook"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    shortIntroduction,
    coverImage,
    isFree,
    ageRange,
    averageRating,
    publishedAt
  }`

  return client.fetch(query)
}

export default async function StoriesPage() {
  const t = await getTranslations('library')
  const stories = await getStories()
  const locale = await getLocale()
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: stories.slice(0, 50).map((story, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/stories/${story.slug.current}`,
      name: story.title[locale as 'en' | 'af'] || story.title.en || story.title.af,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#ecfeff] via-[#f0fdfa] to-[#fff7ed] py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-3 text-center font-fredoka text-4xl font-bold text-[#0f172a] md:text-5xl">{t('title')}</h1>
          <p className="mx-auto mb-8 max-w-3xl text-center text-[#334155]">{t('description')}</p>

          <StoryLibrary stories={stories} locale={locale} />
        </div>
      </main>
    </>
  )
}
