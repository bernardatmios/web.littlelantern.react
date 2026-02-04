import { client, StoryBook } from '@/lib/sanity'
import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import StoryContent from '@/components/StoryContent'

async function getStory(slug: string): Promise<StoryBook | null> {
  const query = `*[_type == "storyBook" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortIntroduction,
    story,
    audioFile {
      en {
        asset->
      },
      af {
        asset->
      }
    },
    coverImage {
      en {
        asset->
      },
      af {
        asset->
      }
    },
    isFree,
    ageRange,
    averageRating,
    publishedAt
  }`

  return client.fetch(query, { slug })
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = await getStory(slug)
  const locale = await getLocale()

  if (!story) {
    notFound()
  }

  return (
    <>
      <Header />
      <StoryContent story={story} locale={locale} />
    </>
  )
}
