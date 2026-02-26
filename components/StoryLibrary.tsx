'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { StoryBook } from '@/lib/sanity'
import StoryCard from '@/components/StoryCard'

interface StoryLibraryProps {
  stories: StoryBook[]
  locale: string
}

export default function StoryLibrary({ stories, locale }: StoryLibraryProps) {
  const tCommon = useTranslations('common')
  const t = useTranslations('library')
  const [ageFilter, setAgeFilter] = useState('all')
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'free' | 'premium'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStories = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return stories.filter((story) => {
      if (ageFilter !== 'all' && story.ageRange !== ageFilter) return false
      if (availabilityFilter === 'free' && !story.isFree) return false
      if (availabilityFilter === 'premium' && story.isFree) return false

      if (normalizedQuery) {
        const title = story.title[locale as 'en' | 'af'] || story.title.en || story.title.af || ''
        const intro =
          story.shortIntroduction[locale as 'en' | 'af'] ||
          story.shortIntroduction.en ||
          story.shortIntroduction.af ||
          ''
        const haystack = `${title} ${intro}`.toLowerCase()
        if (!haystack.includes(normalizedQuery)) return false
      }

      return true
    })
  }, [stories, ageFilter, availabilityFilter, searchQuery, locale])

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-br from-[#ecfeff] via-white to-[#fff7ed] p-6 shadow-xl ring-1 ring-[#0f766e]/15">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-[#0f172a]">{t('curateStories')}</h2>
          <div className="rounded-full bg-[#0f766e] px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
            {t('booksFound', { count: filteredStories.length })}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#0f766e]">{t('ageFilterLabel')}</label>
            <select
              value={ageFilter}
              onChange={(event) => setAgeFilter(event.target.value)}
              className="w-full rounded-xl border border-[#99f6e4] bg-white px-3 py-2.5 text-sm text-[#0f172a] shadow-sm outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4]"
            >
              <option value="all">{t('allAgeGroups')}</option>
              <option value="0-2">{tCommon('ageOption0_2')}</option>
              <option value="3-5">{tCommon('ageOption3_5')}</option>
              <option value="6-8">{tCommon('ageOption6_8')}</option>
              <option value="9-12">{tCommon('ageOption9_12')}</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#0f766e]">
              {t('availabilityLabel')}
            </label>
            <select
              value={availabilityFilter}
              onChange={(event) => setAvailabilityFilter(event.target.value as 'all' | 'free' | 'premium')}
              className="w-full rounded-xl border border-[#99f6e4] bg-white px-3 py-2.5 text-sm text-[#0f172a] shadow-sm outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4]"
            >
              <option value="all">{t('allAvailability')}</option>
              <option value="free">{t('freeStories')}</option>
              <option value="premium">{t('premiumStories')}</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#0f766e]">{t('searchLabel')}</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-xl border border-[#99f6e4] bg-white px-3 py-2.5 text-sm text-[#0f172a] shadow-sm outline-none transition placeholder:text-[#94a3b8] focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4]"
            />
          </div>
        </div>
      </div>

      {filteredStories.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-md">
          <p className="text-lg text-[#475569]">{t('noFilterResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => (
            <StoryCard key={story._id} story={story} locale={locale} />
          ))}
        </div>
      )}
    </div>
  )
}
