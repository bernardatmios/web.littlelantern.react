import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { StoryBook, urlFor } from '@/lib/sanity'

interface StoryCardProps {
  story: StoryBook
  locale: string
}

export default function StoryCard({ story, locale }: StoryCardProps) {
  const tCommon = useTranslations('common')
  const tStories = useTranslations('stories')
  const title = story.title[locale as 'en' | 'af']
  const intro = story.shortIntroduction[locale as 'en' | 'af']

  const coverImage = story.coverImage?.[locale as 'en' | 'af'] || story.coverImage?.en || story.coverImage?.af
  const imageUrl = coverImage ? urlFor(coverImage).width(420).height(620).url() : null

  return (
    <Link href={`/stories/${story.slug.current}`}>
      <article className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-[#0f766e]/10 transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-64">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#ccfbf1]">
              <span className="text-6xl">📚</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
          {!story.isFree && (
            <div className="absolute right-3 top-3 rounded-full bg-[#f97316] px-3 py-1 text-xs font-bold text-white">
              {tCommon('premium')}
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="mb-2 line-clamp-2 font-fredoka text-2xl font-bold text-[#0f172a]">{title}</h3>
          <p className="mb-4 line-clamp-3 text-[#475569]">{intro}</p>

          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#ecfeff] px-3 py-1 text-sm font-medium text-[#0f766e]">
              {tStories('ageBadge', { age: story.ageRange })}
            </span>

            {story.averageRating > 0 && (
              <div className="flex items-center gap-1 text-sm font-semibold text-[#334155]">
                <span className="text-[#f59e0b]">★</span>
                <span>{story.averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
