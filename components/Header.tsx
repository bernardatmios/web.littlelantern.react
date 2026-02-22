'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/contexts/AuthContext'
import { useViewMode } from '@/contexts/ViewModeContext'
import { BRAND_LOGO_URL } from '@/lib/branding'
import LanguageSwitcher from './LanguageSwitcher'
import ModeSwitcher from './ModeSwitcher'

export default function Header() {
  const t = useTranslations('common')
  const { user, logout } = useAuth()
  const { mode } = useViewMode()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#99f6e4] bg-[#ecfeff]/95 backdrop-blur">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11">
              <Image src={BRAND_LOGO_URL} alt={t('appName')} fill sizes="44px" className="object-contain" />
            </div>
            <span className="text-2xl font-bold text-[#0f766e] font-fredoka">{t('appName')}</span>
          </Link>
          <ModeSwitcher />
        </div>

        <nav className="flex items-center gap-5 text-sm md:text-base">
          <Link href="/stories" className="font-medium text-[#0f172a] transition-colors hover:text-[#0f766e]">
            {mode === 'parent' ? t('storyLibrary') : t('stories')}
          </Link>

          {mode === 'child' && (
            <Link href="/kids" className="font-medium text-[#0f172a] transition-colors hover:text-[#f97316]">
              {t('kidsSpace')}
            </Link>
          )}

          {user ? (
            <>
              <Link
                href="/profile"
                className="font-medium text-[#0f172a] transition-colors hover:text-[#0f766e]"
              >
                {t('profile')}
              </Link>
              <button
                onClick={handleLogout}
                className="font-medium text-[#0f172a] transition-colors hover:text-[#0f766e]"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-medium text-[#0f172a] transition-colors hover:text-[#0f766e]"
              >
                {t('login')}
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#0f766e] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#115e59]"
              >
                {t('register')}
              </Link>
            </>
          )}

          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  )
}
