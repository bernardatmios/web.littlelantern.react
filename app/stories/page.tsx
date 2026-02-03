import { client, StoryBook } from '@/lib/sanity'
import { getLocale } from 'next-intl/server'
import Header from '@/components/Header'
import StoryCard from '@/components/StoryCard'

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
  const stories = await getStories()
  const locale = await getLocale()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-8 text-center font-fredoka">
            All Stories
          </h1>

          {stories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 mb-4">No stories available yet</p>
              <p className="text-gray-500">Check back soon for new adventures!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {stories.map((story) => (
                <StoryCard key={story._id} story={story} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
