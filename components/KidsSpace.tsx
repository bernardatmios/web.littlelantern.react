'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { StoryBook } from '@/lib/sanity'
import { useViewMode } from '@/contexts/ViewModeContext'
import StoryCard from '@/components/StoryCard'

interface KidsSpaceProps {
  stories: StoryBook[]
  locale: string
}

export default function KidsSpace({ stories, locale }: KidsSpaceProps) {
  const tCommon = useTranslations('common')
  const t = useTranslations('kids')
  const { childProfile, setChildProfile, setMode } = useViewMode()

  const kidStories = useMemo(
    () => stories.filter((story) => story.ageRange === childProfile.ageRange || story.isFree),
    [stories, childProfile.ageRange],
  )

  return (
    <section>
      <div className="mb-8 rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-[#f97316]/20 md:p-8">
        <p className="mb-2 inline-block rounded-full bg-[#ffedd5] px-3 py-1 text-sm font-semibold text-[#9a3412]">
          {t('childProfile')}
        </p>
        <h1 className="mb-3 font-fredoka text-4xl font-bold text-[#0f172a]">{t('helloName', { name: childProfile.name })}</h1>
        <p className="mb-5 max-w-3xl text-[#334155]">
          {t('safeSpaceDescription', { ageRange: childProfile.ageRange })}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <input
            value={childProfile.name}
            onChange={(event) =>
              setChildProfile({ ...childProfile, name: event.target.value || t('defaultChildName') })
            }
            className="rounded-lg border border-[#fed7aa] bg-white px-4 py-2 text-[#0f172a]"
            placeholder={t('childNamePlaceholder')}
          />
          <select
            value={childProfile.ageRange}
            onChange={(event) => setChildProfile({ ...childProfile, ageRange: event.target.value })}
            className="rounded-lg border border-[#fed7aa] bg-white px-4 py-2 text-[#0f172a]"
          >
            <option value="0-2">{tCommon('ageOption0_2')}</option>
            <option value="3-5">{tCommon('ageOption3_5')}</option>
            <option value="6-8">{tCommon('ageOption6_8')}</option>
            <option value="9-12">{tCommon('ageOption9_12')}</option>
          </select>
          <Link
            href="/stories"
            onClick={() => setMode('parent')}
            className="rounded-full border border-[#0f766e] px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ecfeff]"
          >
            {t('backToParent')}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {kidStories.slice(0, 9).map((story) => (
          <StoryCard key={story._id} story={story} locale={locale} />
        ))}
      </div>
    </section>
  )
}
