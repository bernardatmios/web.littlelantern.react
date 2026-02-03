'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { StoryBook, urlFor } from '@/lib/sanity'
import { useAuth } from '@/contexts/AuthContext'
import AudioPlayer from './AudioPlayer'
import RatingComponent from './RatingComponent'

interface StoryContentProps {
  story: StoryBook
  locale: string
}

export default function StoryContent({ story, locale }: StoryContentProps) {
  const { user } = useAuth()
  const title = story.title[locale as 'en' | 'af']
  const intro = story.shortIntroduction[locale as 'en' | 'af']
  const content = story.story[locale as 'en' | 'af']
  const imageUrl = urlFor(story.coverImage).width(800).height(1200).url()

  const canReadFull = user || story.isFree

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-12">
      <article className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="relative h-96">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {story.isFree && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                FREE STORY
              </div>
            )}
          </div>

          <div className="p-8">
            {/* Title and Meta */}
            <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4 font-fredoka">
              {title}
            </h1>

            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="text-sm text-gray-500 bg-purple-100 px-4 py-2 rounded-full">
                Ages {story.ageRange}
              </span>
              {story.averageRating > 0 && (
                <div className="flex items-center gap-1 bg-yellow-100 px-4 py-2 rounded-full">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {story.averageRating.toFixed(1)} / 5
                  </span>
                </div>
              )}
            </div>

            {/* Introduction */}
            <p className="text-xl text-gray-700 mb-8 italic">{intro}</p>

            {/* Audio Player */}
            {story.audioFile && canReadFull && (
              <div className="mb-8">
                <AudioPlayer audioFile={story.audioFile} title={title} />
              </div>
            )}

            {/* Story Content or Login Prompt */}
            {canReadFull ? (
              <div className="prose prose-lg max-w-none">
                <PortableText
                  value={content}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-gray-800 text-lg leading-relaxed mb-4">
                          {children}
                        </p>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-3xl font-bold text-purple-600 mt-8 mb-4 font-fredoka">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-2xl font-bold text-purple-600 mt-6 mb-3 font-fredoka">
                          {children}
                        </h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-purple-400 pl-4 italic my-6 text-gray-700">
                          {children}
                        </blockquote>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-bold text-purple-700">{children}</strong>
                      ),
                      em: ({ children }) => <em className="italic">{children}</em>,
                    },
                  }}
                />
              </div>
            ) : (
              <div className="bg-purple-100 border-2 border-purple-300 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-4 font-fredoka">
                  Premium Story
                </h3>
                <p className="text-gray-700 mb-6">
                  Please log in to read this full story and access audio narration
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link
                    href="/login"
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-purple-600"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            )}

            {/* Rating Component */}
            {user && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <RatingComponent storyId={story._id} userId={user.uid} />
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  )
}
