'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
      window.location.reload()
    })
  }

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => handleLanguageChange('en')}
        disabled={isPending}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } disabled:opacity-50`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('af')}
        disabled={isPending}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          locale === 'af'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } disabled:opacity-50`}
      >
        AF
      </button>
    </div>
  )
}
