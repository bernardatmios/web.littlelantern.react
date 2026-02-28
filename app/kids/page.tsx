import type { Metadata } from 'next'
import { client, StoryBook } from '@/lib/sanity'
import { getLocale } from 'next-intl/server'
import Header from '@/components/Header'
import KidsSpace from '@/components/KidsSpace'

export const metadata: Metadata = {
  title: 'Kids Space',
  robots: {
    index: false,
    follow: false,
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

export default async function KidsPage() {
  const locale = await getLocale()
  const stories = await getStories()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,#ccfbf1_0%,#f0fdfa_45%,#fff7ed_100%)] py-12">
        <div className="container mx-auto px-4">
          <KidsSpace stories={stories} locale={locale} />
        </div>
      </main>
    </>
  )
}
