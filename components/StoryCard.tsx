import Link from 'next/link'
import Image from 'next/image'
import { StoryBook, urlFor } from '@/lib/sanity'

interface StoryCardProps {
  story: StoryBook
  locale: string
}

export default function StoryCard({ story, locale }: StoryCardProps) {
  const title = story.title[locale as 'en' | 'af']
  const intro = story.shortIntroduction[locale as 'en' | 'af']
  const imageUrl = urlFor(story.coverImage).width(400).height(600).url()

  return (
    <Link href={`/stories/${story.slug.current}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
        <div className="relative h-64">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {story.isFree && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              FREE
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-purple-600 mb-2 font-fredoka line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3">{intro}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 bg-purple-100 px-3 py-1 rounded-full">
              {story.ageRange} years
            </span>

            {story.averageRating > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-semibold text-gray-700">
                  {story.averageRating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
