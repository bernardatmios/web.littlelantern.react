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
  const [freeOnly, setFreeOnly] = useState(false)

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      if (freeOnly && !story.isFree) return false
      if (ageFilter !== 'all' && story.ageRange !== ageFilter) return false
      return true
    })
  }, [stories, ageFilter, freeOnly])

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white/85 p-5 shadow-lg ring-1 ring-[#0f766e]/15">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-[#0f172a]">
            {t('curateStories')}
          </h2>
          <div className="rounded-full bg-[#ecfeff] px-3 py-1 text-sm font-medium text-[#0f766e]">
            {t('storiesCount', { count: filteredStories.length })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={ageFilter}
            onChange={(event) => setAgeFilter(event.target.value)}
            className="rounded-lg border border-[#99f6e4] bg-white px-3 py-2 text-sm text-[#0f172a]"
          >
            <option value="all">{t('allAgeGroups')}</option>
            <option value="0-2">{tCommon('ageOption0_2')}</option>
            <option value="3-5">{tCommon('ageOption3_5')}</option>
            <option value="6-8">{tCommon('ageOption6_8')}</option>
            <option value="9-12">{tCommon('ageOption9_12')}</option>
          </select>

          <label className="inline-flex items-center gap-2 rounded-lg border border-[#fed7aa] bg-[#fff7ed] px-3 py-2 text-sm text-[#9a3412]">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(event) => setFreeOnly(event.target.checked)}
              className="accent-[#f97316]"
            />
            {t('freeOnly')}
          </label>
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
