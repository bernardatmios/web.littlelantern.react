'use client'

import { useTranslations } from 'next-intl'
import { useViewMode } from '@/contexts/ViewModeContext'

export default function ModeSwitcher() {
  const t = useTranslations('common')
  const { mode, setMode } = useViewMode()

  return (
    <div className="inline-flex items-center rounded-full bg-white/80 p-1 shadow-sm ring-1 ring-[#0f766e]/20">
      <button
        type="button"
        onClick={() => setMode('parent')}
        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
          mode === 'parent' ? 'bg-[#0f766e] text-white' : 'text-[#0f172a] hover:bg-[#e6fffb]'
        }`}
      >
        {t('parentMode')}
      </button>
      <button
        type="button"
        onClick={() => setMode('child')}
        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
          mode === 'child' ? 'bg-[#f97316] text-white' : 'text-[#0f172a] hover:bg-[#fff4e6]'
        }`}
      >
        {t('childMode')}
      </button>
    </div>
  )
}
