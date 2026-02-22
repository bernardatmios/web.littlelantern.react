'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { PortableText } from '@portabletext/react'
import { StoryBook, urlFor } from '@/lib/sanity'
import { useAuth } from '@/contexts/AuthContext'
import { useViewMode } from '@/contexts/ViewModeContext'
import AudioPlayer from './AudioPlayer'
import RatingComponent from './RatingComponent'

interface StoryContentProps {
  story: StoryBook
  locale: string
}

export default function StoryContent({ story, locale }: StoryContentProps) {
  const tStory = useTranslations('story')
  const tStories = useTranslations('stories')
  const { user } = useAuth()
  const { mode, childProfile } = useViewMode()
  const title = story.title[locale as 'en' | 'af']
  const intro = story.shortIntroduction[locale as 'en' | 'af']
  const content = story.story[locale as 'en' | 'af']

  const coverImage = story.coverImage?.[locale as 'en' | 'af'] || story.coverImage?.en || story.coverImage?.af
  const imageUrl = coverImage ? urlFor(coverImage).width(900).height(1200).url() : null

  const canReadFull = user || story.isFree
  const canRate = Boolean(user && mode === 'parent')

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ecfeff] via-[#f0fdfa] to-[#fff7ed] py-12">
      <article className="container mx-auto max-w-4xl px-4">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-[#0f766e]/10">
          <div className="relative h-96">
            {imageUrl ? (
              <Image src={imageUrl} alt={title} fill className="object-cover" priority />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#ccfbf1]">
                <span className="text-8xl">📚</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#0f766e]">
              {mode === 'child' ? tStory('childModeBadge', { name: childProfile.name }) : tStory('parentModeBadge')}
            </div>
            {story.isFree && (
              <div className="absolute right-4 top-4 rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-white">
                {tStory('freeStoryBadge')}
              </div>
            )}
          </div>

          <div className="p-8">
            <h1 className="mb-4 font-fredoka text-4xl font-bold text-[#0f172a] md:text-5xl">{title}</h1>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-[#ecfeff] px-4 py-2 text-sm text-[#0f766e]">
                {tStories('ageBadge', { age: story.ageRange })}
              </span>
              {story.averageRating > 0 && (
                <div className="flex items-center gap-1 rounded-full bg-[#fef3c7] px-4 py-2">
                  <span className="text-[#f59e0b]">★</span>
                  <span className="text-sm font-semibold text-[#78350f]">{story.averageRating.toFixed(1)} / 5</span>
                </div>
              )}
            </div>

            <p className="mb-8 text-xl italic text-[#334155]">{intro}</p>

            {story.audioFile && story.audioFile[locale as 'en' | 'af'] && canReadFull && (
              <div className="mb-8">
                <AudioPlayer audioFile={story.audioFile[locale as 'en' | 'af']!} title={title} />
              </div>
            )}

            {canReadFull ? (
              <div className="prose prose-lg max-w-none">
                <PortableText
                  value={content}
                  components={{
                    block: {
                      normal: ({ children }) => <p className="mb-4 text-lg leading-relaxed text-[#1e293b]">{children}</p>,
                      h2: ({ children }) => (
                        <h2 className="mb-4 mt-8 font-fredoka text-3xl font-bold text-[#0f766e]">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mb-3 mt-6 font-fredoka text-2xl font-bold text-[#0f766e]">{children}</h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="my-6 border-l-4 border-[#14b8a6] pl-4 italic text-[#475569]">{children}</blockquote>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => <strong className="font-bold text-[#0f766e]">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                    },
                  }}
                />
              </div>
            ) : (
              <div className="rounded-xl border-2 border-[#fdba74] bg-[#fff7ed] p-8 text-center">
                <div className="mb-4 text-6xl">🔒</div>
                <h3 className="mb-4 font-fredoka text-2xl font-bold text-[#9a3412]">{tStory('premiumTitle')}</h3>
                <p className="mb-6 text-[#7c2d12]">{tStory('premiumPrompt')}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/login"
                    className="rounded-lg bg-[#0f766e] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#115e59]"
                  >
                    {tStory('loginCta')}
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-lg border-2 border-[#0f766e] bg-white px-6 py-3 font-semibold text-[#0f766e] transition-colors hover:bg-[#ecfeff]"
                  >
                    {tStory('registerCta')}
                  </Link>
                </div>
              </div>
            )}

            {canRate && (
              <div className="mt-8 border-t border-[#ccfbf1] pt-8">
                <RatingComponent storyId={story._id} userId={user.uid} />
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  )
}
